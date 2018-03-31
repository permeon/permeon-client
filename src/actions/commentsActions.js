import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import { getVideoPosts } from "../helpers/videoHelpers";
import { transformPayload } from "../lib/utils";

export const actionTypes = {
  RECEIVE_COMMENTS: '@comments/RECEIVE_COMMENTS',
  SET_COMMENTS_FETCHING_STATUS: '@comments/SET_COMMENTS_FETCHING_STATUS',
};

function setCommentsFetching(isFetching) {
  return {
    type: actionTypes.SET_COMMENTS_FETCHING_STATUS,
    isFetching,
  }
}

export function fetchComments(channel, permlink, limit=100) {
  return (dispatch, getState) => {
    // return steem.api.getContentRepliesAsync(channel, permlink, (error, response) => {
    return steem.api.getDiscussionsByChildren({start_author: channel, start_permlink: permlink, limit}, (error, response) => {
      if (error) {
        return Promise.reject(error);
      }
      console.log('comments:', response);
      dispatch({
        type: actionTypes.RECEIVE_COMMENTS,
        payload: response,
        channel,
        permlink,
      });
      return Promise.resolve(response);
    })
  }
}
