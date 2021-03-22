const cheerio = require("cheerio");
const url = require("url");

const getAbsoluteUrl = (baseUrl, href) => {
  return url.resolve(baseUrl, href);
};

const parseBase = (baseUrl, $) => {
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
        ...parseImage(baseUrl, $(header).find('a > img[src*="sambalogo"]')),
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

const parseImage = (baseUrl, imgHtml) => {
  const $ = cheerio(imgHtml);
  return {
    src: $.attr("src"),
    alt: $.attr("alt"),
    width: $.attr("width"),
    height: $.attr("height"),
  };
};

export const parseHome = (baseUrl, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(baseUrl, $),
    classifields: {
      href: $('td > a[href^="/vw/classifieds/detail"]').attr("href"),
      img: $('td > a[href^="/vw/classifieds/detail"] img').attr("src"),
      title: $("td").has('> a[href^="/vw/classifieds/detail"]').text(),
    },
  };
};

export const parseClassifieds = (baseUrl, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(baseUrl, $),
  };
};

export const parseForums = (baseUrl, html) => {
  const $ = cheerio.load(html);
  let group = {};
  return {
    ...parseBase(baseUrl, $),
    forumGroups: $("body > table.forumline")
      .first()
      .find("> tbody > tr")
      .toArray()
      .reduce((acc, el) => {
        if ($(el).find("th").length) return acc;

        if ($(el).find("td.catLeft").length) {
          acc.push({
            title: $(el).find("a.cattitle").text(),
            href: getAbsoluteUrl(
              baseUrl,
              $(el).find("a.cattitle").attr("href")
            ),
            items: [],
          });
          return acc;
        }

        acc[acc.length - 1].items.push({
          newPosts: !!$(el).find('img[src*="folder_new"]').length,
          title: $(el).find("a.forumlink").text(),
          href: getAbsoluteUrl(baseUrl, $(el).find("a.forumlink").attr("href")),
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
              href: getAbsoluteUrl(
                baseUrl,
                $(el).find("td:eq(4) .gensmall a").first().attr("href")
              ),
            },
            latestReply: getAbsoluteUrl(
              baseUrl,
              $(el).find("td:eq(4) .gensmall a").last().attr("href")
            ),
          },
        });

        return acc;
      }, []),
  };
};

export const parseGallery = (baseUrl, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(baseUrl, $),
  };
};

export const parseCommunity = (baseUrl, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(baseUrl, $),
  };
};

export const parseTechnical = (baseUrl, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(baseUrl, $),
  };
};

export const parseArchives = (baseUrl, html) => {
  const $ = cheerio.load(html);
  return {
    ...parseBase(baseUrl, $),
  };
};
