import steem from '../lib/steemApi';
import { selectors } from '../reducers';

export const actionTypes = {
  RECEIVE_SUBSCRIPTION_COUNTS: '@subscriptions/RECEIVE_SUBSCRIPTION_COUNTS',
  RECEIVE_SUBSCRIPTIONS: '@subscriptions/RECEIVE_SUBSCRIPTIONS',
  REMOVE_SUBSCRIPTION: '@subscriptiosn/REMOVE_SUBSCRIPTION',
  SUB_UNSUB_SET_LOADING: '@subscriptiosn/SUB_UNSUB_SET_LOADING'
};

function subUnsubLoading(account, channel, isLoading) {
  return {
    type: actionTypes.SUB_UNSUB_SET_LOADING,
    account,
    channel,
    isLoading
  };
}

export function subscribe(channel) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const activeAccount = selectors.auth.activeAccountName(state);
    const payload = ['follow', { follower: activeAccount, following: channel, what: ['blog'] }];
    dispatch(subUnsubLoading(activeAccount, channel, true));
    return steem.broadcast
      .customJsonAsync(postingKey, [], [activeAccount], 'follow', JSON.stringify(payload))
      .then(response => {
        dispatch(subUnsubLoading(activeAccount, channel, false));
        dispatch({
          type: actionTypes.RECEIVE_SUBSCRIPTIONS,
          payload: [{ following: channel }],
          account: activeAccount
        });
      })
      .catch(error => {
        dispatch(subUnsubLoading(activeAccount, channel, false));
        console.log('error:', error);
      });
  };
}

export function unSubscribe(channel) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const activeAccount = selectors.auth.activeAccountName(state);
    const payload = ['follow', { follower: activeAccount, following: channel, what: [''] }];
    dispatch(subUnsubLoading(activeAccount, channel, true));
    return steem.broadcast
      .customJsonAsync(postingKey, [], [activeAccount], 'follow', JSON.stringify(payload))
      .then(response => {
        dispatch(subUnsubLoading(activeAccount, channel, false));
        dispatch({
          type: actionTypes.REMOVE_SUBSCRIPTION,
          channel,
          account: activeAccount
        });
      })
      .catch(error => {
        dispatch(subUnsubLoading(activeAccount, channel, false));
        console.log('error:', error);
      });
  };
}

export function subscriptionCount(channel) {
  return (dispatch, getState) => {
    return steem.api
      .getFollowCountAsync(channel)
      .then(response => {
        dispatch({
          type: actionTypes.RECEIVE_SUBSCRIPTION_COUNTS,
          payload: {
            [channel]: {
              subscriptions: response.following_count,
              subscribers: response.follower_count
            }
          }
        });
      })
      .catch(error => {
        console.log('error:', error);
      });
  };
}

export function subscriptions(limit = 100, startFollowing = '') {
  return (dispatch, getState) => {
    const activeAccount = selectors.auth.activeAccountName(getState());
    return steem.api
      .getFollowingAsync(activeAccount, startFollowing, 'blog', limit)
      .then(response => {
        dispatch({
          type: actionTypes.RECEIVE_SUBSCRIPTIONS,
          payload: response,
          account: activeAccount
        });

        return response;
      })
      .catch(error => {
        console.log('error:', error);
      });
  };
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
          const last = response[response.length - 1];
          return allSubscriptions(last.following)(dispatch, getState);
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
  };
}
