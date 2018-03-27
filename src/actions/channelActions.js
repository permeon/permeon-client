import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import {getVideoPosts} from "../helpers/channelHelpers";
import {transformPayload} from "../lib/utils";

export const actionTypes = {
  RECEIVE_VIDEOS: 'RECEIVE_VIDEOS',
};

export function channelVideos(account, start=0, limit=50) {
  return (dispatch, getState) => {
    return steem.api.getBlogAsync(account, start, limit)
      .then(response => {
        const videoPosts = getVideoPosts(response);
        dispatch({type: actionTypes.RECEIVE_VIDEOS, payload: transformPayload(videoPosts, 'id')});
        console.log('videoPosts:', videoPosts);
      })
  }
}

