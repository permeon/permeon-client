import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from "../actions/subscriptionsActions";

function subscriptions(state = {}, action) {
  switch(action.type) {
    case actionTypes.RECEIVE_SUBSCRIPTIONS:
      return {
        ...state,
        [action.account]: [
          ...(state[action.account] || []),
          ...action.payload.map(obj => obj.following)
        ],
      };
    default:
      return state;
  }
}

function counts(state={}, action) {
  switch(action.type) {
    case actionTypes.RECEIVE_SUBSCRIPTION_COUNTS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

export default combineReducers({
  subscriptions,
  counts,
});

// Selectors
export const isSubscribedTo = (state, account, channel) => _.includes(state.subscriptions[account], channel);
export const mySubscriptions = (state, account) => state.subscriptions[account];

export const subscriberCount = (state, channel) => _.get(state.counts[channel], 'subscribers', -1);
export const subscriberCountLoading = (state, channel) => _.get(state.counts[channel], 'isLoading', false);

