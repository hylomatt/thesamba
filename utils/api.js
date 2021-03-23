import fetch from "node-fetch";

import constants from "./constants";
import {
  parseHome,
  parseClassifieds,
  parseForums,
  parseGallery,
  parseCommunity,
  parseTechnical,
  parseArchives,
  parseAbout,
} from "./parsers";

const getPage = async (path) => {
  const url = `${constants.baseUrl}${path}`;
  console.log("fetchUrl:", url);
  return await fetch(url)
    .then(async (r) => await r.text())
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const getHome = async (path) => {
  return await getPage(path).then((r) => parseHome(path, r));
};

export const getClassifieds = async (path) => {
  return await getPage(path).then((r) => parseClassifieds(path, r));
};

export const getForums = async (path) => {
  return await getPage(path).then((r) => parseForums(path, r));
};

export const getGallery = async (path) => {
  return await getPage(path).then((r) => parseGallery(path, r));
};

export const getCommunity = async (path) => {
  return await getPage(path).then((r) => parseCommunity(path, r));
};

export const getTechnical = async (path) => {
  return await getPage(path).then((r) => parseTechnical(path, r));
};

export const getArchives = async (path) => {
  return await getPage(path).then((r) => parseArchives(path, r));
};

export const getAbout = async (path) => {
  return await getPage(path).then((r) => parseAbout(path, r));
};
