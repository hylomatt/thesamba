import fetch from 'node-fetch'
// import xml2js from 'xml2js'
import iconv from 'iconv-lite'

import constants from './constants'
import { getSetCookieHeaders } from './cookies'
import {
  parseHome,
  parseFeaturedClassifieds,
  parseClassifieds,
  parsePlaceAd,
  parseClassifiedSearch,
  parseClassifiedCategory,
  parseClassifiedDetail,
  parseClassifiedContact,
  parseForums,
  parseForumSearch,
  parseForum,
  parseTopic,
  parsePosting,
  parseGallery,
  parseGalleryCategory,
  parseGallerySearch,
  parseGalleryPage,
  parseCommunity,
  parseTechnical,
  parseArchives,
  parseAbout,
  parseLogin,
  parseProfileEdit,
  parseProfileView,
  parseProfileRegister,
  parseProfileRegisterAgreed,
  parseWhatsNew
} from './parsers'

const getPage = async (req) => {
  const url = `${constants.baseUrl}${req.url}`.replace(/\/_next\/.*\/vw/, '/vw').replace('.json', '')
  return await fetch(url, { headers: { cookie: req?.headers?.cookie } })
    .then(async (r) => {
      const cookies = getSetCookieHeaders(r.headers.get('set-cookie') || [])
      const arrayBuffer = await r.arrayBuffer()
      const data = iconv.decode(Buffer.from(arrayBuffer), 'WINDOWS-1252')
      const redirect = url !== r.url ? r.url.replace(constants.baseUrl, '') : null

      return {
        cookies,
        data,
        redirect
      }
    })
    .catch((e) => {
      console.error(e)
      return null
    })
}

const formatBaseUrl = (url) => {
  return url.replace(/\/_next\/.*\/vw/, '/vw').replace('.json', '')
}

// const getFeed = async (req) => {
//   // https://www.thesamba.com/vw/forum/viewforum.php?f=5
//   // https://www.thesamba.com/vw/forum/rss.php?f=5
//   const rssPath = r.url.replace('viewforum.php', 'rss.php')
//   const url = `${constants.baseUrl}${rssPath}`
//   return await fetch(url)
//     .then(async (r) => {
//       return await r.text()
//     })
//     .then(async (xml) => {
//       const parser = new xml2js.Parser()
//       return await parser
//         .parseStringPromise(xml)
//         .then((result) => {
//           return result
//         })
//         .catch((err) => {
//           console.log('xm parse error:', err)
//           return null
//         })
//     })
//     .catch((e) => {
//       console.error(e)
//       return null
//     })
// }

export const getHome = async (req) => {
  const basePath = formatBaseUrl(req.url)
  const [homeSource, featuredAds] = await Promise.all([
    getPage(req),
    getPage({
      ...req,
      url: `${basePath}classifieds/featuredads_refresh2.php?l=1`
    })
  ])
  const data = await parseHome(basePath, homeSource.data)
  data.page.featuredAds = await parseFeaturedClassifieds(basePath, featuredAds.data)
  return { ...homeSource, data }
}

export const getClassifieds = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseClassifieds(basePath, r.data) }
  })
}

export const getPlaceAd = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parsePlaceAd(basePath, r.data) }
  })
}

export const getClassifiedSearch = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseClassifiedSearch(basePath, r.data) }
  })
}

export const getClassifiedCategory = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseClassifiedCategory(basePath, r.data) }
  })
}

export const getClassifiedDetail = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseClassifiedDetail(basePath, r.data) }
  })
}

export const getClassifiedContact = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseClassifiedContact(basePath, r.data) }
  })
}

export const getForums = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseForums(basePath, r.data) }
  })
}

export const getForumSearch = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseForumSearch(basePath, r.data) }
  })
}

export const getForum = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseForum(basePath, r.data) }
  })
}

export const getTopic = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseTopic(basePath, r.data) }
  })
}

export const getPosting = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parsePosting(basePath, r.data) }
  })

}

export const getGallery = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseGallery(basePath, r.data) }
  })
}

export const getGalleryCategory = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseGalleryCategory(basePath, r.data) }
  })
}

export const getGallerySearch = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseGallerySearch(basePath, r.data) }
  })
}

export const getGalleryPage = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseGalleryPage(basePath, r.data) }
  })
}

export const getCommunity = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseCommunity(basePath, r.data) }
  })
}

export const getTechnical = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseTechnical(basePath, r.data) }
  })
}

export const getArchives = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseArchives(basePath, r.data) }
  })
}

export const getAbout = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseAbout(basePath, r.data) }
  })
}

export const getLogin = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseLogin(basePath, r.data) }
  })
}

export const getProfile = async (req, query) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)

    const { mode, agreed } = query
    const profileMode = (mode || '').toLowerCase()

    if (profileMode === 'editprofile') {
      return { ...r, data: parseProfileEdit(basePath, r.data) }
    } else if (profileMode === 'viewprofile') {
      return { ...r, data: parseProfileView(basePath, r.data) }
    } else if (profileMode === 'register' && agreed === 'true') {
      return { ...r, data: parseProfileRegisterAgreed(basePath, r.data) }
    } else if (profileMode === 'register') {
      return { ...r, data: parseProfileRegister(basePath, r.data) }
    } else if (profileMode === 'watchlist_ads') {
      return { ...r, data: {} }
    } else if (profileMode === 'watchlist_album') {
      return { ...r, data: {} }
    } else if (profileMode === 'watchlist') {
      return { ...r, data: {} }
    } else if (profileMode === 'emaillist_ads') {
      return { ...r, data: {} }
    } else if (profileMode === 'watchlist_sellers') {
      return { ...r, data: {} }
    } else if (profileMode === 'foelist_class') {
      return { ...r, data: {} }
    } else if (profileMode === 'favorite_searches') {
      return { ...r, data: {} }
    } else if (profileMode === 'alerts') {
      return { ...r, data: {} }
    } else if (profileMode === 'bookmarks') {
      return { ...r, data: {} }
    } else if (profileMode === 'buddylist') {
      return { ...r, data: {} }
    } else if (profileMode === 'foelist') {
      return { ...r, data: {} }
    }
  })
}

export const getWhatsNew = async (req) => {
  return await getPage(req).then((r) => {
    const basePath = formatBaseUrl(req.url)
    return { ...r, data: parseWhatsNew(basePath, r.data) }
  })
}
