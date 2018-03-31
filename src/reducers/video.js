import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from "../actions/videoActions";

function videoReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_VIDEO:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
    video: videoReducer,
  });

// Selectors
export const video = (state, channel) => _.get(state.video, 'author') === channel ? state.video : null;

