import steem from '../lib/steemApi';
import {selectors} from '../reducers';

export const actionTypes = {
  RECEIVE_SUBSCRIPTION_COUNTS: '@subscriptions/RECEIVE_SUBSCRIPTION_COUNTS',
  RECEIVE_SUBSCRIPTIONS: '@subscriptions/RECEIVE_SUBSCRIPTIONS',
};

export function subscribe(channel) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const activeAccount = selectors.auth.activeAccountName(state);
    const payload = ['follow', {follower: activeAccount, following: channel, what: ['blog']}];
    return steem.broadcast.customJsonAsync(postingKey, [], [activeAccount], 'follow', JSON.stringify(payload))
      .then(response => {
        console.log('response:', response);
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

export function unSubscribe(channel) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const activeAccount = selectors.auth.activeAccountName(state);
    const payload = ['follow', {follower: activeAccount, following: channel, what: ['']}];
    return steem.broadcast.customJsonAsync(postingKey, [], [activeAccount], 'follow', JSON.stringify(payload))
      .then(response => {
        console.log('response:', response);
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

export function subscriptionCount(channel) {
  return (dispatch, getState) => {
    return steem.api.getFollowCountAsync(channel)
      .then(response => {
        console.log('response:', response)
        dispatch({
          type: actionTypes.RECEIVE_SUBSCRIPTION_COUNTS,
          payload: {
            [channel]: {
              subscriptions: response.following_count,
              subscribers: response.follower_count,
            }
          }
        })
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

export function subscriptions(limit=100, startFollowing='') {
  return (dispatch, getState) => {
    const activeAccount = selectors.auth.activeAccountName(getState());
    return steem.api.getFollowingAsync(activeAccount, startFollowing, 'blog', limit)
      .then(response => {
        console.log('response:', response)
        dispatch({
          type: actionTypes.RECEIVE_SUBSCRIPTIONS,
          payload: response,
          account: activeAccount,
        });

        return response;
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}

/**
 *  Paginates through subscriptions()
 */
export function allSubscriptions(startFollowing) {
  const pageSize = 100;
  return (dispatch, getState) => {
    return subscriptions(pageSize, startFollowing)(dispatch, getState)
      .then(response => {
        if (response.length === pageSize) {
          const last = response[response.length-1];
          return allSubscriptions(last.following)(dispatch, getState)
        }
      })
      .catch(error => {
        console.log('error:', error);
      })
  }
}
