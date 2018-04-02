import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from '../actions/reactionsActions';

function emojisReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_REACTIONS:
      return {
        [action.channel]: {
          [action.permlink]: {
            ..._.get(state, [action.channel, action.permlink], {}),
            ...action.payload
          }
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  emojis: emojisReducer
});

// Selectors
export const emojis = (state, channel, permlink) => {
  const counts = {};
  for (const post of _.values(_.get(state.emojis, [channel, permlink]))) {
    const emoji = _.get(post, ['json_metadata', 'emoji']);
    if (!_.has(counts, emoji.id)) {
      counts[emoji.id] = { ...emoji };
      counts[emoji.id].count = 0;
      counts[emoji.id].authors = [];
    }
    counts[emoji.id].count += 1;
    counts[emoji.id].authors.push(post.author);
  }
  return _.values(counts);
};
