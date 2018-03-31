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
export function getVideoState(tag, channel, permlink) {
  return (dispatch, getState) => {

    return steem.api.getStateAsync(`/${tag}/@${channel}/${permlink}`)
    // return steem.api.getStateAsync('/market/@maneco64/620kisip')
      .then(response => {
        console.log('state', response);
        const video = parseVideoPost(_.get(response.content, `${channel}/${permlink}`, {}));
        dispatch({
          type: actionTypes.RECEIVE_VIDEO,
          payload: video,
        });

      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

