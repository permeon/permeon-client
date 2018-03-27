import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from "../actions/channelActions";

function videos(state = {}, action) {
  switch(action.type) {
    case actionTypes.RECEIVE_VIDEOS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    default:
      return state;
  }
}


export default combineReducers({
  videos,
  isLoading,
});

// Selectors
export const allVideos = (state, channel)=> _.values(state.videos);
