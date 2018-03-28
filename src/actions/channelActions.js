import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import {getVideoPosts} from "../helpers/channelHelpers";
import {transformPayload} from "../lib/utils";

export const actionTypes = {
  RECEIVE_VIDEOS: 'RECEIVE_VIDEOS',
};

export function channelVideos(username, limit=100, startAuthor='', startPermlink='') {
  return (dispatch, getState) => {
    const query = {tag: username, limit, truncate_body: 1};
    return steem.api.getDiscussionsByBlogAsync(query)
      .then(response => {
        const videoPosts = getVideoPosts(response).filter(post => post.author === username);
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

