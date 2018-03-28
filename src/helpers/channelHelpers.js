import _ from 'lodash';
import config from '../config';
import { safeJsonParse } from "../lib/utils";

const {APP_NAME} = config.pick('APP_NAME');

const videoApps = [
  APP_NAME,
  'dtube',
];

const parsers = {
  [APP_NAME]: mainAppParser,
  'dtube': dtubeParser,
};

export function getVideoPosts(posts) {
  console.log('posts:', posts);
  const videos = [];
  posts.forEach(post => {
    const { appName } = getAppInfo(post);
    const json_metadata = safeJsonParse(post.json_metadata);

    if (videoApps.includes(appName)) {
      videos.push(parsers[appName](post));
    } else if (appName === 'steemit' && _.get(json_metadata, 'video.content.videohash')) {
      // TODO: refactor quick hack. posts updated by steemit change app name
      videos.push(parsers['dtube'](post));
    }
  });
  return videos;
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
      version: version || '',
    };
  } catch (e) {
    return {appName: '', version: ''};
  }
}

function mainAppParser(post) {
  const json_metadata = safeJsonParse(post.json_metadata);
  const videoData = {

  };
  return {
    ...post,
    json_metadata,
    videoData,
  };
}

function dtubeParser(post) {
  const json_metadata = safeJsonParse(post.json_metadata);
  const videoData = {
    description: _.get(json_metadata.video, 'content.description'),
    url: `https://ipfs.io/ipfs/${_.get(json_metadata.video, 'content.videohash')}`,
    duration: _.get(json_metadata.video, 'info.duration'),
    thumbnail: `https://ipfs.io/ipfs/${_.get(json_metadata.video, 'info.snaphash')}`,
  };
  return {
    ...post,
    json_metadata,
    videoData,
  };
}
