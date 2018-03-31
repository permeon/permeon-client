import { combineReducers } from 'redux';
import _ from 'lodash';


import { actionTypes } from "../actions/commentsActions";

function emojisReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.RECEIVE_COMMENTS:
      return {
        [action.channel]: {
          [action.permlink]: {
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  emojis: emojisReducer,
});

// Selectors
export const emojis = (state, channel, permlink) => _.get(state.emojis, [channel, permlink]);
