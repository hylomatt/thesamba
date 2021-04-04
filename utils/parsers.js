const cheerio = require('cheerio')
// const url = require('url')
// const { URL } = require("url");

// const constants = require('./constants').default

// const getAbsoluteUrl = (basePath, href) => {
//   return href
//   // return url.resolve(basePath, href);
// }

const getFQUrl = (basePath, href) => {
  return href
  // return new url.URL(
  //   getAbsoluteUrl(basePath, href),
  //   constants.baseUrl
  // ).toString();
}

const parseImage = (basePath, imgHtml) => {
  const $ = cheerio(imgHtml)
  return {
    src: getFQUrl(basePath, $.attr('src')) || null,
    alt: $.attr('alt') || null,
    width: $.attr('width') || null,
    height: $.attr('height') || null
  }
}

const parseBase = (basePath, $) => {
  const preHeader = $('body > table:eq(0)')
  const header = $('body > table:eq(1)')
  const nav = $('body > table:eq(2)')

  return {
    title: $('head title').text(),
    loggedIn: !!$(preHeader).find('a[href*="login.php?logout=true"]').length,
    preHeader: {
      user: $(preHeader).find('span.genmedblack:has(a[href*="login.php?logout=true"]) > b:first-child').text() || null,
      logoutLink: $(preHeader).find('a[href*="login.php?logout=true"]').attr('href') || null,
      pms: $(preHeader).find('a[href*="privmsg"]').text() || null
    },
    header: {
      logo: {
        href: $(header).find('a').has('> img[src*="sambalogo"]').attr('href') || null,
        ...parseImage(basePath, $(header).find('a > img[src*="sambalogo"]'))
      }
    },
    nav: $(nav)
      .find('ul#nav > li')
      .map((idx, el) => {
        return {
          title: $(el).find('> a').text().trim(),
          href: $(el).find('> a').attr('href') || null,
          items: $(el)
            .find('ul li a')
            .map((idx2, el2) => {
              return {
                title: $(el2).text().trim(),
                href: $(el2).attr('href') || null
              }
            })
            .toArray()
        }
      })
      .toArray()
  }
}

export const parseHome = (basePath, html) => {
  const $ = cheerio.load(html)

  const mainContent = $('body > table:has(table.borderedhome) > tbody > tr')
  const leftColumn = $(mainContent).find('> td:first-child')
  const centerColumn = $(mainContent).find('> td:nth-child(2)')
  const rightColumn = $(mainContent).find('> td:last-child')

  return {
    ...parseBase(basePath, $),
    scams: $(leftColumn)
      .find('> table:contains("Scam warnings") a')
      .toArray()
      .map((el) => ({
        title: $(el).text(),
        href: $(el).attr('href') || null
      })),
    classifieds: {
      href: $(leftColumn).find('td > a[href^="/vw/classifieds/detail"]').attr('href') || null,
      img: parseImage(basePath, $(leftColumn).find('td > a[href^="/vw/classifieds/detail"] img')),
      title: $(leftColumn).find('td:has(> a[href^="/vw/classifieds/detail"])  ').text()
    },
    gallery: {
      href: $(leftColumn).find('> table:contains("All Gallery") a:has(img[alt="Latest Photo"])').attr('href') || null,
      img: parseImage(basePath, $(leftColumn).find('> table:contains("All Gallery") a img[alt="Latest Photo"]')),
      title: $(leftColumn).find('> table:contains("All Gallery") td:has(a:has(img[alt="Latest Photo"]))').text()
    },
    fact: {
      img: parseImage(basePath, $(centerColumn).find('>table:first-child img#randoms')),
      content: $(centerColumn).find('>table:first-child span.gen').html()
    },
    featuredAds: $(centerColumn)
      .find('span#ads td.genmed')
      .toArray()
      .map((el) => ({
        title: $(el)
          .contents()
          .filter((i, el) => el.nodeType === 3)
          .text()
          .trim(),
        img: parseImage(basePath, $(el).find('img')),
        href: $(el).find('a').attr('href') || null
      })),
    advertisement: {},
    stolen: {
      href: $(rightColumn).find('> table:contains("Stolen") a:has(img)').attr('href') || null,
      img: parseImage(basePath, $(rightColumn).find('> table:contains("Stolen") a:has(img) img')),
      title: $(rightColumn).find('> table:contains("Stolen") td:has(img)').text()
    },
    comingEvents:
      ($(rightColumn).find('#vmarquee').html() || '')
        .trim()
        .replace(/<br>/g, '')
        .replace(/<b>/g, '</div><div><b>')
        .replace(/^<\/div>/, '') + '</div>'
  }
}

export const parseClassifieds = (basePath, html) => {
  const $ = cheerio.load(html)
  const mainContent = $('body > table:has(table.forumline)')
  return {
    ...parseBase(basePath, $),
    categories: $(mainContent)
      .find('table.forumline')
      .first()
      .find('> tbody > tr')
      .toArray()
      .reduce((acc, el) => {
        if ($(el).find('th').length) return acc

        if ($(el).find('.catLeft').length) {
          acc.push({
            title: $(el).find('.cattitle').text(),
            items: []
          })
          return acc
        }

        acc[acc.length - 1].items.push({
          title: $(el).find('a.forumlink').text(),
          href: `/vw/classifieds/${$(el).find('a.forumlink').attr('href') || ''}`,
          description: $(el).find('.row1 .gensmall').text(),
          adCount: $(el).find('.row2 .gensmall').text()
        })

        return acc
      }, []),
    featuredAds: $(mainContent)
      .find('table.forumline')
      .last()
      .find('> tbody > tr:nth-child(2) td.genmed')
      .toArray()
      .map((el) => {
        return {
          title: $(el)
            .contents()
            .filter((i, el) => el.nodeType === 3)
            .text()
            .trim(),
          href: $(el).find('a').attr('href') || null,
          img: parseImage(basePath, $(el).find('img'))
        }
      }),
    randomAds: $(mainContent)
      .find('table.forumline')
      .last()
      .find('> tbody > tr:nth-child(4) td.genmed')
      .toArray()
      .map((el) => {
        return {
          title: $(el)
            .contents()
            .filter((i, el) => el.nodeType === 3)
            .text()
            .trim(),
          href: $(el).find('a').attr('href') || null,
          img: parseImage(basePath, $(el).find('img'))
        }
      })
  }
}

export const parseClassifiedCategory = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $),
    category: {
      title: $('body > table .maintitle').text(),
      href: `/vw/classifieds/${$('body > table .maintitle').attr('href') || ''}`,
      pages: $('span.pages')
        .first()
        .find('b, a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: $(el).attr('href') || null
        })),
      nav: $('body > table:has(input#keywords) span.nav')
        .contents()
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: $(el).attr('href') || null
        })),
      featuredAds: $('body > table:has(.forumline)')
        .first()
        .find('td:has(>a)')
        .toArray()
        .map((el) => ({
          title: $(el)
            .contents()
            .filter((i, el) => el.nodeType === 3)
            .text()
            .trim(),
          href: $(el).find('a').attr('href') || null,
          img: parseImage(basePath, $(el).find('img'))
        })),
      ads: $('body > table.forumline')
        .first()
        .find('> tbody > tr:has(td:not(.catBottom))')
        .toArray()
        .map((el) => ({
          title: $(el).find('> td:nth-child(2) a').text(),
          href: $(el).find('> td:nth-child(2) a').attr('href') || null,
          isNew: !!$(el).find('> td:nth-child(2) > img').length,
          img: parseImage(basePath, $(el).find('> td:first-child a img')),
          price: $(el).find('> td:nth-child(3)').text().trim(),
          date: $(el)
            .find('> td:last-child')
            .contents()
            .filter((i, el) => el.nodeType === 3)
            .text()
            .trim(),
          location: $(el)
            .find('> td:last-child span')
            .contents()
            .filter((i, el) => el.nodeType === 3)
            .text()
            .trim(),
          seller: {
            title: $(el).find('> td:last-child span a').text(),
            href: $(el).find('> td:last-child span a').attr('href') || null
          }
        }))
    }
  }
}

export const parseClassifiedDetail = (basePath, html) => {
  const $ = cheerio.load(html)
  const mainContent = $('body > table.forumline')
  const classifiedsBody = $(mainContent).find('table > tbody:has(> tr > td > span.maintitle) > tr > td')
  const bottomBodyBox = $(classifiedsBody[2]).find('> table > tbody > tr:has(td.row1)')
  return {
    ...parseBase(basePath, $),
    detail: {
      nav: $('body > table span.nav')
        .first()
        .contents()
        .toArray()
        .map((el) => ({
          title: $(el)
            .text()
            .replace(/-(>|<)/g, '')
            .trim(),
          href: $(el).attr('href') || null
        })),
      title: $(mainContent).find('> tbody > tr > th td').first().text().trim(),
      adId: $(mainContent).find('> tbody > tr > th td a').last().text().trim(),
      thumbnails: $(mainContent)
        .find('img[src*="pix/thumbnails/"]')
        .toArray()
        .map((img) => parseImage(basePath, img)),
      description: $(classifiedsBody[1]).find('span.gen').html(),
      advertiserInfo: {
        title: $(bottomBodyBox[0]).find('> td:first-child > table > tbody > tr:first-child > td:last-child a').text(),
        href: $(bottomBodyBox[0]).find('> td:first-child > table > tbody > tr:first-child > td:last-child a').attr('href') || null,
        memberSince: $(bottomBodyBox[0])
          .find('> td:first-child > table > tbody > tr:first-child > td:last-child')
          .contents()
          .filter((i, el) => el.nodeType === 3)
          .text()
          .trim(),
        phone: $(bottomBodyBox[0]).find('> td:first-child > table > tbody > tr:last-child span#ph').attr('data-ph') || null,
        email: $(bottomBodyBox[0]).find('> td:first-child > table > tbody > tr:last-child a').attr('href') || null
      },
      adInfo: {
        titles: $(bottomBodyBox[0]).find('> td:last-child td:first-child').html(),
        values: $(bottomBodyBox[0]).find('> td:last-child td:last-child').html()
      }
    }
  }
}

export const parseForums = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $),
    forumGroups: $('body > table.forumline')
      .first()
      .find('> tbody > tr')
      .toArray()
      .reduce((acc, el) => {
        if ($(el).find('th').length) return acc

        if ($(el).find('td.catLeft').length) {
          acc.push({
            title: $(el).find('.cattitle:not(:has(a)), .cattitle a').text(),
            href: $(el).find('.cattitle a').attr('href') || null,
            items: []
          })
          return acc
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find('a.forumlink').text(),
          href: $(el).find('a.forumlink').attr('href') || null,
          description: $(el).find('td:has(a.forumlink) span.genmed').last().text(),
          topics: $(el).find('td:eq(2) .gensmall').text(),
          posts: $(el).find('td:eq(3) .gensmall').text(),
          lastPost: {
            text: $(el)
              .find('td:eq(4) .gensmall')
              .contents()
              .filter((i, el) => el.nodeType === 3)
              .text()
              .trim(),
            user: {
              title: $(el).find('td:eq(4) .gensmall a').first().text(),
              href: $(el).find('td:eq(4) .gensmall a').first().attr('href') || null
            },
            latestReply: $(el).find('td:eq(4) .gensmall a').last().attr('href') || null
          }
        })

        return acc
      }, [])
  }
}

export const parseForum = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $),
    forumGroups: $('body > table.forumline')
      .first()
      .find('> tbody > tr')
      .toArray()
      .reduce((acc, el) => {
        if ($(el).find('th').length) return acc

        if ($(el).find('td.catHead  ').length) {
          acc.push({
            title: $(el).find('.cattitle:not(:has(a)), .cattitle a').text(),
            href: $(el).find('.cattitle a').attr('href') || null,
            items: []
          })
          return acc
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find('td:eq(1) a.topictitle').text(),
          href: $(el).find('td:eq(1) a.topictitle').attr('href') || null,
          pages: $(el).find('td:eq(1) span.gensmall').last().text().trim(),
          replies: $(el).find('td:eq(2) .postdetails').text(),
          author: {
            text: $(el).find('td:eq(3) .postdetails').text(),
            user: {
              title: $(el).find('td:eq(3) .postdetails a').first().text(),
              href: $(el).find('td:eq(3) .postdetails a').first().attr('href') || null
            }
          },
          views: $(el).find('td:eq(4) .postdetails').text(),
          lastPost: {
            text: $(el)
              .find('td:eq(5) .postdetails')
              .contents()
              .filter((i, el) => el.nodeType === 3)
              .text()
              .trim(),
            user: {
              title: $(el).find('td:eq(5) .postdetails a').first().text(),
              href: $(el).find('td:eq(5) .postdetails a').first().attr('href') || null
            }
            // latestReply: $(el)
            //   .find("td:eq(5) .postdetails a")
            //   .last()
            //   .attr("href"),
          }
        })

        return acc
      }, [])
  }
}

export const parseTopic = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $),
    topic: {
      title: $('a.maintitle').text(),
      href: $('a.maintitle').attr('href') || null,
      pages: $('span.pages')
        .first()
        .find('b, a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: $(el).attr('href') || null
        })),
      nav: $('span.nav')
        .first()
        .find('a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: $(el).attr('href') || null
        }))
    },
    posts: $('body > table.forumline')
      .first()
      .find('> tbody > tr:has(.postdetails)')
      .toArray()
      .reduce((acc, el) => {
        // if ($(el).find('th').length) return acc
        // if ($(el).find('td.spaceRow').length) return acc

        acc.push({
          name: {
            title: $(el).find('span.name a').text(),
            href: $(el).find('span.name a').attr('href') || null
          },
          posterDetails: $(el).find('> td > span.postdetails').html() || null,
          postDetails: $(el).find('table span.postdetails').html() || null,
          content: $(el).find('.postbody').html() || null
        })

        return acc
      }, [])
  }
}

export const parseGallery = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
  }
}

export const parseCommunity = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
  }
}

export const parseTechnical = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
  }
}

export const parseArchives = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
  }
}

export const parseAbout = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
  }
}

export const parseLogin = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
  }
}
