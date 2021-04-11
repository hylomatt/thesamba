const cheerio = require('cheerio')
const { URL } = require('url')

const constants = require('./constants').default

const getAbsHref = (basePath, href = '') => {
  let absUrl = getFQUrl(basePath, href)
  absUrl = absUrl.replace(constants.baseUrl, '')
  if (absUrl && !absUrl.startsWith('/vw/')) {
    absUrl = `/vw/${absUrl}`
  }
  absUrl = absUrl.replace('vw//', 'vw/')
  return absUrl
}

const getFQUrl = (basePath, href) => {
  if (!href) return href
  const resolvedUrl = new URL(href, new URL(`${constants.baseUrl}${basePath}`, 'resolve://'))
  return resolvedUrl.href
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
      logoutLink: getAbsHref(basePath, $(preHeader).find('a[href*="login.php?logout=true"]').attr('href')),
      pms: $(preHeader).find('a[href*="privmsg"]').text() || null
    },
    header: {
      logo: {
        href: getAbsHref(basePath, $(header).find('a').has('> img[src*="sambalogo"]').attr('href')),
        ...parseImage(basePath, $(header).find('a > img[src*="sambalogo"]'))
      }
    },
    nav: $(nav)
      .find('ul#nav > li')
      .map((idx, el) => {
        return {
          title: $(el).find('> a').text().trim(),
          href: getAbsHref(basePath, $(el).find('> a').attr('href')),
          items: $(el)
            .find('ul li a')
            .map((idx2, el2) => {
              return {
                title: $(el2).text().trim(),
                href: getAbsHref(basePath, $(el2).attr('href'))
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
        href: getAbsHref(basePath, $(el).attr('href'))
      })),
    classifieds: {
      href: getAbsHref(basePath, $(leftColumn).find('td > a[href^="/vw/classifieds/detail"]').attr('href')),
      img: parseImage(basePath, $(leftColumn).find('td > a[href^="/vw/classifieds/detail"] img')),
      title: $(leftColumn).find('td:has(> a[href^="/vw/classifieds/detail"])  ').text()
    },
    gallery: {
      href: getAbsHref(basePath, $(leftColumn).find('> table:contains("All Gallery") a:has(img[alt="Latest Photo"])').attr('href')),
      img: parseImage(basePath, $(leftColumn).find('> table:contains("All Gallery") a img[alt="Latest Photo"]')),
      title: $(leftColumn).find('> table:contains("All Gallery") td:has(a:has(img[alt="Latest Photo"]))').text()
    },
    fact: {
      href: getAbsHref(basePath, $(centerColumn).find('>table:first-child a:has(img#randoms)').attr('href')),
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
        href: getAbsHref(basePath, $(el).find('a').attr('href'))
      })),
    advertisement: {},
    stolen: {
      href: getAbsHref(basePath, $(rightColumn).find('> table:contains("Stolen") a:has(img)').attr('href')),
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
          href: getAbsHref(basePath, $(el).find('a.forumlink').attr('href')),
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
          href: getAbsHref(basePath, $(el).find('a').attr('href')),
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
          href: getAbsHref(basePath, $(el).find('a').attr('href')),
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
      href: getAbsHref(basePath, $('body > table .maintitle').attr('href')),
      pages: $('span.pages')
        .first()
        .find('b, a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      nav: $('body > table:has(input#keywords) span.nav')
        .contents()
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
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
          href: getAbsHref(basePath, $(el).find('a').attr('href')),
          img: parseImage(basePath, $(el).find('img'))
        })),
      ads: $('body > table.forumline')
        .first()
        .find('> tbody > tr:has(td:not(.catBottom))')
        .toArray()
        .map((el) => ({
          title: $(el).find('> td:nth-child(2) a').text(),
          href: getAbsHref(basePath, $(el).find('> td:nth-child(2) a').attr('href')),
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
            href: getAbsHref(basePath, $(el).find('> td:last-child span a').attr('href'))
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
          href: getAbsHref(basePath, $(el).attr('href'))
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
        href: getAbsHref(basePath, $(bottomBodyBox[0]).find('> td:first-child > table > tbody > tr:first-child > td:last-child a').attr('href')),
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
            href: getAbsHref(basePath, $(el).find('.cattitle a').attr('href')),
            items: []
          })
          return acc
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find('a.forumlink').text(),
          href: getAbsHref(basePath, $(el).find('a.forumlink').attr('href')),
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
              href: getAbsHref(basePath, $(el).find('td:eq(4) .gensmall a').first().attr('href'))
            },
            latestReply: getAbsHref(basePath, $(el).find('td:eq(4) .gensmall a').last().attr('href'))
          }
        })

        return acc
      }, [])
  }
}

export const parseForumSearch = (basePath, html) => {
  const $ = cheerio.load(html)
  return {
    ...parseBase(basePath, $)
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

        if ($(el).find('td.catHead').length) {
          acc.push({
            title: $(el).find('.cattitle:not(:has(a)), .cattitle a').text(),
            // href: getAbsHref(basePath, $(el).find('.cattitle a').attr('href')),
            items: []
          })
          return acc
        }

        if ($(el).find('td.catBottom').length) {
          return acc
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find('td:eq(1) a.topictitle').text(),
          href: getAbsHref(basePath, $(el).find('td:eq(1) a.topictitle').attr('href')),
          pages: $(el).find('td:eq(1) span.gensmall').last().text().trim(),
          replies: $(el).find('td:eq(2) .postdetails').text(),
          author: {
            text: $(el)
              .find('td:eq(3) .postdetails')
              .contents()
              .filter((i, el) => el.nodeType === 3)
              .text()
              .trim(),
            user: {
              title: $(el).find('td:eq(3) .postdetails a').first().text(),
              href: getAbsHref(basePath, $(el).find('td:eq(3) .postdetails a').first().attr('href'))
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
              href: getAbsHref(basePath, $(el).find('td:eq(5) .postdetails a').first().attr('href'))
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
      href: getAbsHref(basePath, $('a.maintitle').attr('href')),
      pages: $('span.pages > b')
        .first()
        .find('b, a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      nav: $('span.nav')
        .first()
        .find('a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      posts: $('body > table.forumline')
        .first()
        .find('> tbody > tr:has(.postdetails)')
        .toArray()
        .reduce((acc, el) => {
          // if ($(el).find('th').length) return acc
          // if ($(el).find('td.spaceRow').length) return acc

          acc.push({
            name: {
              title: $(el).find('span.name b a').text(),
              href: getAbsHref(basePath, $(el).find('span.name b a').attr('href'))
            },
            posterDetails: $(el).find('> td > span.postdetails').html() || null,
            postDetails: $(el)
              .find('table span.postdetails')
              .contents()
              .filter((i, el) => el.nodeType === 3)
              .toArray()
              .map((el) => $(el).text()),
            content: $(el).find('.postbody').html() || null
          })

          return acc
        }, [])
    }
  }
}

export const parseGallery = (basePath, html) => {
  const $ = cheerio.load(html)

  const topBoxes = $('body > table.forumline').first().find('>tbody>tr>td>table>tbody>tr')
  const categoriesTable = $('body > table.forumline').last().find('>tbody>tr:has(td:not(.catLeft))')

  return {
    ...parseBase(basePath, $),
    gallery: {
      latestEntry: {
        href: getAbsHref(basePath, $(topBoxes[0]).find('>td:first-child a').attr('href')),
        img: parseImage(basePath, $(topBoxes[0]).find('>td:first-child a img')),
        topictitle: $(topBoxes[0]).find('>td:last-child span.topictitle').text(),
        postbody: $(topBoxes[0]).find('>td:last-child span.postbody').html()
      },
      stolen: {
        href: getAbsHref(basePath, $(topBoxes[1]).find('>td:first-child a').attr('href')),
        img: parseImage(basePath, $(topBoxes[1]).find('>td:first-child a img')),
        topictitle: $(topBoxes[1]).find('>td:last-child span.topictitle').text(),
        postbody: $(topBoxes[1]).find('>td:last-child span.postbody').html()
      },
      categories: categoriesTable.toArray().map((el) => ({
        title: $(el).find('>td:first-child a.forumlink').text(),
        href: getAbsHref(basePath, $(el).find('>td:first-child a.forumlink').attr('href')),
        subTitle: $(el).find('>td:first-child > span.genmed').text().trim(),
        pics: $(el).find('>td:nth-child(2) > span.gensmall').text(),
        lastPic: $(el).find('>td:last-child > span.gensmall').html()
      }))
    }
  }
}

export const parseGalleryCategory = (basePath, html) => {
  const $ = cheerio.load(html)

  return {
    ...parseBase(basePath, $),
    category: {
      title: $('body > table .maintitle').text(),
      href: getAbsHref(basePath, $('body > table .maintitle').attr('href')),
      pages: $('span.pages')
        .first()
        .find('b, a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      nav: $('body > table:has(input#search_keywords) span.nav')
        .contents()
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      entries: $('body > table.forumline > tbody > tr > td > table > tbody > tr')
        .toArray()
        .map((el) => ({
          info: $(el).find('> td:nth-child(2)').html().trim(),
          href: getAbsHref(basePath, $(el).find('> td:first-child a:has(img)').attr('href')),
          img: parseImage(basePath, $(el).find('> td:first-child a img')),
          imgInfo: $(el)
            .find('> td:first-child .gensmall')
            .contents()
            .filter((i, el) => el.nodeType === 3)
            .toArray()
            .reduce((acc, el) => {
              const splitter = 'Views:'
              if (el.data.includes(splitter)) {
                const splitData = el.data.split(splitter)
                acc.push(splitData[0].trim(), `Views: ${splitData[1]}`.trim())
              } else {
                acc.push(el.data.trim())
              }
              return acc
            }, []),
          forumCode: $(el).find('> td:last-child input').attr('value')
        }))
    }
  }
}

export const parseGallerySearch = (basePath, html) => {
  const $ = cheerio.load(html)

  return {
    ...parseBase(basePath, $),
    category: {
      title: $('body > table .maintitle').text(),
      href: getAbsHref(basePath, $('body > table .maintitle').attr('href')),
      pages: $('span.pages')
        .first()
        .find('b, a')
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      nav: $('body > table:has(input#search_keywords) span.nav')
        .contents()
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),
      entries: $('body > table.forumline > tbody > tr > td > table > tbody > tr')
        .toArray()
        .map((el) => ({
          info: $(el).find('> td:nth-child(2)').html().trim(),
          href: getAbsHref(basePath, $(el).find('> td:first-child a:has(img)').attr('href')),
          img: parseImage(basePath, $(el).find('> td:first-child a img')),
          imgInfo: $(el).find('> td:first-child .gensmall').html().trim(),
          forumCode: $(el).find('> td:last-child input').attr('value')
        }))
    }
  }
}

export const parseGalleryPage = (basePath, html) => {
  const $ = cheerio.load(html)

  const contentContainer = $('body > table.forumline')

  return {
    ...parseBase(basePath, $),
    page: {
      // title: $('body > table .maintitle').text(),
      // href: getAbsHref(basePath, $('body > table .maintitle').attr('href'))
      nav: $(contentContainer)
        .prev('table')
        .find(' span.nav')
        .contents()
        .toArray()
        .map((el) => ({
          title: $(el).text().trim(),
          href: getAbsHref(basePath, $(el).attr('href'))
        })),

      title: $(contentContainer).find('th.thTop').text(),
      photoLink: $(contentContainer).find('> tbody > tr:nth-child(2) td table td:nth-child(2) input').attr('value') || null,
      forumCode: $(contentContainer).find('> tbody > tr:nth-child(2) td table td:nth-child(4) input').attr('value') || null,
      img: parseImage(basePath, $(contentContainer).find('> tbody > tr:nth-child(2) td > a img')),
      href: getAbsHref(basePath, $(contentContainer).find('> tbody > tr:nth-child(2) td > a:has(img)').attr('href')),
      author: {
        name: $(contentContainer).find('> tbody > tr:nth-child(3) table.forumline > tbody > tr:nth-child(2) td:first-child .name b').text(),
        info: $(contentContainer).find('> tbody > tr:nth-child(3) table.forumline > tbody > tr:nth-child(2) td:first-child .postdetails').html()
      },
      photo: {
        title: $(contentContainer).find('> tbody > tr:nth-child(3) table.forumline > tbody > tr:nth-child(2) td:last-child tr:first-child td:first-child .genmed b').text(),
        description: $(contentContainer).find('> tbody > tr:nth-child(3) table.forumline > tbody > tr:nth-child(2) td:last-child tr:last-child .row2').html()
      }
    }
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

export const parseProfile = (basePath, html) => {
  const $ = cheerio.load(html)
  const container = $('body > table.forumline')
  return {
    ...parseBase(basePath, $),
    profile: {
      title: $(container).find('.thHead').text(),
      avatar: {
        img: parseImage(basePath, $(container).find('> tbody > tr:nth-child(3) > td:first-child > img'))
      },
      info: $(container)
        .find('> tbody > tr:nth-child(3) > td:last-child tr')
        .toArray()
        .map((el) => {
          return [$(el).find('td:first-child .gen').text().trim(), $(el).find('td:last-child .gen').html()]
        }),
      contact: $(container)
        .find('> tbody > tr:nth-child(5) tr')
        .toArray()
        .map((el) => {
          return [$(el).find('td:first-child .gen').text().trim(), $(el).find('td:last-child .gen').html()]
        }),
      signature: $(container).find('> tbody > tr:last-child > td').html()
    }
  }
}

export const parseProfileRegister = (basePath, html) => {
  const $ = cheerio.load(html)
  const container = $('body > table.forumline')
  return {
    ...parseBase(basePath, $),
    register: {
      title: $(container).find('.thHead').text(),
      content: $(container).find('span.genmed').html()
    }
  }
}

export const parseProfileRegisterAgreed = (basePath, html) => {
  const $ = cheerio.load(html)
  const container = $('body form')
  return {
    ...parseBase(basePath, $),
    registerAgreed: {
      formAction: $(container).attr('action') || null,
      encType: $(container).attr('enctype') || null,
      confirmImage: parseImage(basePath, $(container).find('table tr td img[src*="profile.php?mode=confirm&id="]')),
      boardLanguage: $(container)
        .find('select[name="language"] option')
        .toArray()
        .map((el) => ({
          text: $(el).text(),
          value: $(el).attr('value'),
          selected: $(el).attr('selected') || null
        })),
      timezones: $(container)
        .find('select[name="timezone"] option')
        .toArray()
        .map((el) => ({
          text: $(el).text(),
          value: $(el).attr('value'),
          selected: $(el).attr('selected') || null
        })),
      hiddenInputs: $(container)
        .find('input[type="hidden"]')
        .toArray()
        .map((el) => ({
          name: $(el).attr('name'),
          value: $(el).attr('value')
        })),
      error: $('body > .forumline tr td span.gen').text()
    }
  }
}
