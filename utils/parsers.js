const cheerio = require("cheerio");
const url = require("url");
// const { URL } = require("url");

const constants = require("./constants").default;

const getAbsoluteUrl = (basePath, href) => {
  return href;
  // return url.resolve(basePath, href);
};

const getFQUrl = (basePath, href) => {
  return href;
  // return new url.URL(
  //   getAbsoluteUrl(basePath, href),
  //   constants.baseUrl
  // ).toString();
};

const parseImage = (basePath, imgHtml) => {
  const $ = cheerio(imgHtml);
  return {
    src: getFQUrl(basePath, $.attr("src")),
    alt: $.attr("alt"),
    width: $.attr("width") || null,
    height: $.attr("height") || null,
  };
};

const parseBase = (basePath, $) => {
  const preHeader = $("body > table:eq(0)");
  const header = $("body > table:eq(1)");
  const nav = $("body > table:eq(2)");
  return {
    title: $("head title").text(),
    isLoggedIn: !!$(preHeader).find('a[href*="login.php?logout=true"]').length,
    preHeader: {},
    header: {
      logo: {
        href: $(header).find("a").has('> img[src*="sambalogo"]').attr("href"),
        ...parseImage(basePath, $(header).find('a > img[src*="sambalogo"]')),
      },
    },
    nav: $(nav)
      .find("ul#nav > li")
      .map((idx, el) => ({
        title: $(el).find("> a").text().trim(),
        href: $(el).find("> a").attr("href"),
        items: $(el)
          .find("ul li a")
          .map((idx2, el2) => ({
            title: $(el2).text().trim(),
            href: $(el2).attr("href"),
          }))
          .toArray(),
      }))
      .toArray(),
  };
};

export const parseHome = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
    classifields: {
      href: $('td > a[href^="/vw/classifieds/detail"]').attr("href"),
      img: parseImage(
        basePath,
        $('td > a[href^="/vw/classifieds/detail"] img')
      ),
      title: $("td").has('> a[href^="/vw/classifieds/detail"]').text(),
    },
  };
};

export const parseClassifieds = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
  };
};

export const parseForums = (basePath, html) => {
  const $ = cheerio.load(html);
  let group = {};
  return {
    ...parseBase(basePath, $),
    forumGroups: $("body > table.forumline")
      .first()
      .find("> tbody > tr")
      .toArray()
      .reduce((acc, el) => {
        if ($(el).find("th").length) return acc;

        if ($(el).find("td.catLeft").length) {
          acc.push({
            title: $(el).find("a.cattitle").text(),
            href: $(el).find("a.cattitle").attr("href"),
            items: [],
          });
          return acc;
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find("a.forumlink").text(),
          href: $(el).find("a.forumlink").attr("href"),
          description: $(el)
            .find("td:has(a.forumlink) span.genmed")
            .last()
            .text(),
          topics: $(el).find("td:eq(2) .gensmall").text(),
          posts: $(el).find("td:eq(3) .gensmall").text(),
          lastPost: {
            text: $(el)
              .find("td:eq(4) .gensmall")
              .contents()
              .filter(function () {
                return this.nodeType == 3;
              })
              .text()
              .trim(),
            user: {
              title: $(el).find("td:eq(4) .gensmall a").first().text(),
              href: $(el).find("td:eq(4) .gensmall a").first().attr("href"),
            },
            latestReply: $(el).find("td:eq(4) .gensmall a").last().attr("href"),
          },
        });

        return acc;
      }, []),
  };
};

export const parseForum = (basePath, html) => {
  const $ = cheerio.load(html);
  let group = {};
  return {
    ...parseBase(basePath, $),
    forumGroups: $("body > table.forumline")
      .first()
      .find("> tbody > tr")
      .toArray()
      .reduce((acc, el) => {
        if ($(el).find("th").length) return acc;

        if ($(el).find("td.catHead  ").length) {
          acc.push({
            title: $(el).find(".cattitle a").text(),
            href: null, // $(el).find(".cattitle a").attr("href"),
            items: [],
          });
          return acc;
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find("td:eq(1) a.topictitle").text(),
          // href: $(el).find("td:eq(1) a.topictitle").attr("href"),
          pages: $(el).find("td:eq(1) span.gensmall").last().text(),
          replies: $(el).find("td:eq(2) .postdetails").text(),
          author: {
            text: $(el).find("td:eq(3) .postdetails").text(),
            user: {
              title: $(el).find("td:eq(3) .postdetails a").first().text(),
              // href: $(el).find("td:eq(3) .postdetails a").first().attr("href"),
            },
          },
          views: $(el).find("td:eq(4) .postdetails").text(),
          lastPost: {
            text: $(el)
              .find("td:eq(5) .postdetails")
              .contents()
              .filter(function () {
                return this.nodeType == 3;
              })
              .text()
              .trim(),
            user: {
              title: $(el).find("td:eq(5) .postdetails a").first().text(),
              // href: $(el).find("td:eq(5) .postdetails a").first().attr("href"),
            },
            // latestReply: $(el)
            //   .find("td:eq(5) .postdetails a")
            //   .last()
            //   .attr("href"),
          },
        });

        return acc;
      }, []),
  };
};

export const parseGallery = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
  };
};

export const parseCommunity = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
  };
};

export const parseTechnical = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
  };
};

export const parseArchives = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
  };
};

export const parseAbout = (basePath, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(basePath, $),
  };
};
