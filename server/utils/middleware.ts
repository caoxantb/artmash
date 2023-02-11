import jsdom from "jsdom";
import express from "express";
import fetch from "node-fetch";
import Artist, { IArtist } from "../models/artist";

// config and error handling
const requestLogger = (req: express.Request, _res: express.Response, next: express.Next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (_req: express.Request, res: express.Response) => {
  res.status(404).send({error: "unknown endpoint" });
};

const errorHandler = (error: express.error, req: express.Request, res: express.Response, next: express.Next) => {
  console.error(error.message);
  next(error);
};

const fetchSpotify = async (url: string) => {
  const fetchResponse = await fetch(url);
  const html = await fetchResponse.text();
  const parsedHTML = new jsdom.JSDOM(html);
  return parsedHTML;
};

const scrapeTracksFromSpotify = async (req: express.Request, res: express.Response, next: express.Next) => {
  const { artistRef, index } = req.params;
  const artist: IArtist = await Artist.findOne({nameRef: artistRef})
  const playlistHTML = await fetchSpotify(artist.playlistURL);
  const trackHTML =
    playlistHTML.window.document.querySelectorAll('[type="track"]')[index - 1];
  const trackData = trackHTML.querySelector("a");
  const trackTitle = trackData.textContent;
  const trackSrc = trackData.href;
  const trackMetaHTML = await fetchSpotify(trackSrc);
  const trackImg = trackMetaHTML.window.document.querySelector('[data-testid="entity-image"]').src
  const trackMetaData = trackMetaHTML.window.document.querySelector(
    '[data-testid="track-entity-metadata"]'
  );
  const artistName = trackMetaData.children[0].textContent
  const trackReleaseYear = trackMetaData.children[1].textContent;
  const trackDuration = trackMetaData.children[2].textContent;
  const trackRelease = trackMetaHTML.window.document
    .querySelector('[data-testid="rich-track-data"]')
    .children[4];
  const trackReleaseType = trackRelease.querySelector('span').textContent
  const trackReleaseTitle = trackRelease.querySelector('a').textContent
  const track = {
    index: index,
    title: trackTitle,
    artist: artistName,
    release: {
      discType: trackReleaseType,
      title: trackReleaseTitle,
    },
    year: trackReleaseYear,
    duration: trackDuration,
    image: trackImg,
    src: trackSrc,
    points: 1400,
  }
  res.track = track
  next();
};

export {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  scrapeTracksFromSpotify,
};
