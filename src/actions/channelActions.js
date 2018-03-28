import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import {getVideoPosts} from "../helpers/channelHelpers";
import {transformPayload} from "../lib/utils";

export const actionTypes = {
  RECEIVE_VIDEOS: 'RECEIVE_VIDEOS',
};

export function channelVideos(username, start=0, limit=100) {
  return (dispatch, getState) => {
    // return steem.api.getBlogAsync(username, start, limit)
    return steem.api.getDiscussionsByBlogAsync({tag: username, limit})
      .then(response => {
        const videoPosts = getVideoPosts(response);
        dispatch({
          type: actionTypes.RECEIVE_VIDEOS,
          payload: transformPayload(videoPosts, 'id'),
          username,
        });
        console.log('videoPosts:', videoPosts);
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

