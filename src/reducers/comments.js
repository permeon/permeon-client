import { combineReducers } from 'redux';
import _ from 'lodash';


import { actionTypes } from "../actions/commentsActions";

function comments(state = [], action) {
  switch (action.type) {
    case actionTypes.RECEIVE_COMMENTS:
      return {
        [action.channel]: {
          [action.permlink]: [
            ...action.payload
          ]
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  comments,
});

// Selectors
export const all = (state, channel, permlink) => _.get(state.comments, [channel, permlink]);
