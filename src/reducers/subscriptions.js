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
    case actionTypes.REMOVE_SUBSCRIPTION:
      return {
        ...state,
        [action.account]: state[action.account].filter(channel => channel !== action.channel)
      };
    default:
      return state;
  }
}

// const def = {
//   'okc': {
//     'component': false,
//   }
// };
function subUnsubLoading(state={}, action) {
  switch (action.type) {
    case actionTypes.SUB_UNSUB_SET_LOADING:
      return {
        ...state,
        [action.account]: {
          ...state[action[action.account]],
          [action.channel]: action.isLoading,
        }
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
  subUnsubLoading,
  counts,
});

// Selectors
export const isSubscribedTo = (state, account, channel) => _.includes(state.subscriptions[account], channel);
export const mySubscriptions = (state, account) => state.subscriptions[account];

export const isSubbingUnsubbing = (state, account, channel) => _.get(state.subUnsubLoading[account], channel);

export const subscriberCount = (state, channel) => _.get(state.counts[channel], 'subscribers', -1);
export const subscriberCountLoading = (state, channel) => _.get(state.counts[channel], 'isLoading', false);

