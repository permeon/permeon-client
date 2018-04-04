import steem from '../lib/steemApi';
import config from '../config';

import { selectors } from '../reducers';
import { transformPayload } from '../lib/utils';

export const actionTypes = {
  SET_UPVOTING_STATUS: '@voting/SET_UPVOTING_STATUS',
  SET_DOWNVOTING_STATUS: '@voting/SET_DOWNVOTING_STATUS',
};

function setUpVoting(isFetching) {
  return {
    type: actionTypes.SET_UPVOTING_STATUS,
    isFetching
  };
}

function setDownVoting(isFetching) {
  return {
    type: actionTypes.SET_DOWNVOTING_STATUS,
    isFetching
  };
}

export function upvote(author, permlink) {
  return (dispatch, getState) => {
    const state = getState();
    const activeAccount = selectors.auth.activeAccountName(state);
    const postingKey = selectors.auth.activeKeys(state).posting;
    const weight = 10000; //TODO: make this an account setting
    return steem.broadcast.voteAsync(postingKey, activeAccount, author, permlink, weight)
      .then(response => {
        console.log('res:', response);
      })
      .catch(error => {
        console.log('err:', error)
      });
  }
}
export function downvote(author, permlink) {
  return (dispatch, getState) => {
    const state = getState();
    const activeAccount = selectors.auth.activeAccountName(state);
    const postingKey = selectors.auth.activeKeys(state).posting;
    const weight = -10000;
    return steem.broadcast.voteAsync(postingKey, activeAccount, author, permlink, weight)
      .then(response => {
        console.log('res:', response);
      })
      .catch(error => {
        console.log('err:', error)
      });
  }
}

