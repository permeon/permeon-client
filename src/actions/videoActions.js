import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import {transformPayload} from "../lib/utils";
import {parseVideoPost} from "../helpers/videoHelpers";

export const actionTypes = {
  RECEIVE_VIDEO: '@video/RECEIVE_VIDEO',
};

/**
 * Uses the getState method from the steem api to get video info
 * @param author - username of the video uploader
 * @param permlink - permlink of the video
 */
export function getVideoState(author, permlink) {
  return (dispatch, getState) => {
    return steem.api.getContentAsync(author, permlink)
      .then(response => {
        const video = parseVideoPost(response);
        dispatch({
          type: actionTypes.RECEIVE_VIDEO,
          payload: video,
        });
        console.log('videoParsed', video)
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

