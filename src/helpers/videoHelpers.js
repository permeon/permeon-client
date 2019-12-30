import _ from 'lodash';
import config from '../config';
import { safeJsonParse } from '../lib/utils';

const { APP_NAME } = config.pick('APP_NAME');

const videoApps = [APP_NAME, 'dtube'];

const parsers = {
  [APP_NAME]: mainAppParser,
  dtube: dtubeParser
};

export function countVotes(votes) {
  const voteCounts = {
    upvotes: 0,
    downvotes: 0
  };
  votes.forEach(vote => {
    if (vote.percent >= 0) {
      voteCounts.upvotes += 1;
    } else {
      voteCounts.downvotes += 1;
    }
  });
  return voteCounts;
}

export function getVideoPosts(posts) {
  const videos = [];
  posts.forEach(post => {
    const parsedVideo = parseVideoPost(post);
    if (parsedVideo) {
      videos.push(parsedVideo);
    }
  });
  return videos;
}

export function parseVideoPost(post) {
  const { appName } = getAppInfo(post);
  const json_metadata = safeJsonParse(post.json_metadata);

  let video;
  if (videoApps.includes(appName)) {
    video = parsers[appName](post);
  } else if (appName === 'steemit' && _.get(json_metadata, 'video.content.videohash')) {
    // TODO: refactor quick hack. posts updated by steemit change app name
    video = parsers['dtube'](post);
  }
  return video;
}

export function getAppInfo(post) {
  try {
    let jsonMetadata = post.json_metadata;
    if (typeof jsonMetadata === 'string') {
      jsonMetadata = safeJsonParse(_.get(post, 'json_metadata'));
    }
    const [appName, version] = _.split(_.get(jsonMetadata, 'app'), '/');
    return {
      appName: appName || '',
      version: version || ''
    };
  } catch (e) {
    return { appName: '', version: '' };
  }
}

/**
 * Formats a videos duration
 * @param durationSecs - duration in secs eg. 33.1123
 * @returns {string} - a formatted duration string
 */
export function formatDuration(durationSecs) {
  const duration = parseFloat(durationSecs, 10);
  const hours = Math.floor(duration / 3600);
  const mins = Math.floor((duration - hours * 3600) / 60);
  const secs = Math.floor(duration - hours * 3600 - mins * 60);

  const hoursF = hours > 9 ? hours : hours;
  const minsF = hours ? (mins > 9 ? mins : '0' + mins) : mins;
  const secsF = secs > 9 ? secs : '0' + secs;

  return hours ? `${hoursF}:${minsF}:${secsF}` : `${minsF}:${secsF}`;
}

/**
 *  Video Post Parsers
 */

function mainAppParser(post) {
  const json_metadata = safeJsonParse(post.json_metadata);
  const videoData = {
    description: post.body,
    url: _.get(json_metadata, 'link'),
    duration: _.get(json_metadata, 'duration', 0),
    thumbnail: _.get(json_metadata, 'thumbnail')
  };
  return {
    ...post,
    json_metadata,
    videoData
  };
}

function dtubeParser(post) {
  const json_metadata = safeJsonParse(post.json_metadata);
  const videoData = {
    description: _.get(json_metadata.video, 'content.description'),
    url: _.get(json_metadata.video, 'url', "https://www.youtube.com/watch?v=9BnLbv6QYcA"),
    duration: _.get(json_metadata.video, 'duration', 0),
    thumbnail: _.get(json_metadata.video, 'thumbnailUrl')
  };
  return {
    ...post,
    json_metadata,
    videoData
  };
}

export function youtubeToEmbedSrc(src) {
  const { id } = parseYoutubeSrc(src);
  return `https://www.youtube.com/embed/${id}`;
}

function parseYoutubeSrc(src) {
  const [original, path, id] = src.match(/(.*?)\?v=([^\/]+)/);
  return {
    original,
    path,
    id
  };
}
