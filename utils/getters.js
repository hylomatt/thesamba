import fetch from 'node-fetch'
import xml2js from 'xml2js'
import iconv from 'iconv-lite'

import constants from './constants'
import { getSetCookieHeaders } from './cookies'
import { parseHome, parseClassifieds, parseClassifiedCategory, parseClassifiedDetail, parseForums, parseForum, parseTopic, parseGallery, parseCommunity, parseTechnical, parseArchives, parseAbout, parseLogin } from './parsers'

const getPage = async (req) => {
  const url = `${constants.baseUrl}${req.url}`.replace(/\/_next\/.*\/vw/, '/vw').replace('.json', '')
  return await fetch(url, { headers: { cookie: req.headers.cookie } })
    .then(async (r) => ({
      cookies: getSetCookieHeaders(r.headers.get('set-cookie')),
      data: iconv.decode(Buffer.from(await r.arrayBuffer()), 'WINDOWS-1252')
    }))
    .catch((e) => {
      console.error(e)
      return null
    })
}

const getFeed = async (req) => {
  // https://www.thesamba.com/vw/forum/viewforum.php?f=5
  // https://www.thesamba.com/vw/forum/rss.php?f=5
  const rssPath = r.url.replace('viewforum.php', 'rss.php')
  const url = `${constants.baseUrl}${rssPath}`
  return await fetch(url)
    .then(async (r) => {
      return await r.text()
    })
    .then(async (xml) => {
      const parser = new xml2js.Parser()
      return await parser
        .parseStringPromise(xml)
        .then((result) => {
          return result
        })
        .catch((err) => {
          console.log('xm parse error:', err)
          return null
        })
    })
    .catch((e) => {
      console.error(e)
      return null
    })
}

export const getHome = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseHome(req.url, r.data) }
  })
}

export const getClassifieds = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseClassifieds(req.url, r.data) }
  })
}

export const getClassifiedCategory = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseClassifiedCategory(req.url, r.data) }
  })
}

export const getClassifiedDetail = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseClassifiedDetail(req.url, r.data) }
  })
}

export const getForums = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseForums(req.url, r.data) }
  })
}

export const getForum = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseForum(req.url, r.data) }
  })
}

export const getTopic = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseTopic(req.url, r.data) }
  })
}

export const getGallery = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseGallery(req.url, r.data) }
  })
}

export const getCommunity = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseCommunity(req.url, r.data) }
  })
}

export const getTechnical = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseTechnical(req.url, r.data) }
  })
}

export const getArchives = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseArchives(req.url, r.data) }
  })
}

export const getAbout = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseAbout(req.url, r.data) }
  })
}

export const getLogin = async (req) => {
  return await getPage(req).then((r) => {
    return { cookies: r.cookies, data: parseLogin(req.url, r.data) }
  })
}
