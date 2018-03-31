import { combineReducers } from 'redux';
import _ from 'lodash';


import { actionTypes } from "../actions/reactionsActions";

function emojisReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.RECEIVE_REACTIONS:
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
export const emojis = (state, channel, permlink) =>
  _.values(_.get(state.emojis, [channel, permlink]))
    .map(post => (
      _.get(post, ['json_metadata', 'emoji'])
    ));
