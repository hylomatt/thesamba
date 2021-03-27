import fetch from 'node-fetch'
import xml2js from 'xml2js'

import constants from './constants'
import {
  parseHome,
  parseClassifieds,
  parseForums,
  parseForum,
  parseGallery,
  parseCommunity,
  parseTechnical,
  parseArchives,
  parseAbout
} from './parsers'

const getPage = async (path) => {
  const url = `${constants.baseUrl}${path}`
  return await fetch(url)
    .then(async (r) => { return await r.text() })
    .catch((e) => {
      console.error(e)
      return null
    })
}

const getFeed = async (path) => {
  // https://www.thesamba.com/vw/forum/viewforum.php?f=5
  // https://www.thesamba.com/vw/forum/rss.php?f=5
  const rssPath = path.replace('viewforum.php', 'rss.php')
  const url = `${constants.baseUrl}${rssPath}`
  return await fetch(url)
    .then(async (r) => { return await r.text() })
    .then(async (xml) => {
      const parser = new xml2js.Parser()
      return await parser
        .parseStringPromise(xml)
        .then((result) => { return result })
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

export const getHome = async (path) => {
  return await getPage(path).then((r) => { return parseHome(path, r) })
}

export const getClassifieds = async (path) => {
  return await getPage(path).then((r) => { return parseClassifieds(path, r) })
}

export const getForums = async (path) => {
  return await getPage(path).then((r) => { return parseForums(path, r) })
}

export const getForum = async (path) => {
  return await getPage(path).then((r) => { return parseForum(path, r) })
}

export const getGallery = async (path) => {
  return await getPage(path).then((r) => { return parseGallery(path, r) })
}

export const getCommunity = async (path) => {
  return await getPage(path).then((r) => { return parseCommunity(path, r) })
}

export const getTechnical = async (path) => {
  return await getPage(path).then((r) => { return parseTechnical(path, r) })
}

export const getArchives = async (path) => {
  return await getPage(path).then((r) => { return parseArchives(path, r) })
}

export const getAbout = async (path) => {
  return await getPage(path).then((r) => { return parseAbout(path, r) })
}
