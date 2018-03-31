import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import {transformPayload} from "../lib/utils";
import {parseVideoPost} from "../helpers/videoHelpers";
import {receiveComments} from './commentsActions';

export const actionTypes = {
  RECEIVE_VIDEO: '@video/RECEIVE_VIDEO',
};

/**
 * Uses the getState method from the steem api to get video info
 * @param tag - the root tag
 * @param channel - username of the video uploader
 * @param permlink - permlink of the video
 */
export function getVideoState(tag, channel, permlink) {
  return (dispatch, getState) => {
    return steem.api.getStateAsync(`/${tag}/@${channel}/${permlink}`)
      .then(response => {
        console.log('state', response);
        const video = parseVideoPost(_.get(response.content, `${channel}/${permlink}`, {}));
        dispatch({
          type: actionTypes.RECEIVE_VIDEO,
          payload: video,
        });
        const commentsPayload = {...response.content};
        delete commentsPayload[`${channel}/${permlink}`];
        dispatch(receiveComments(channel, permlink, commentsPayload));
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

