import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from "../actions/channelActions";

function videos(state = {}, action) {
  switch(action.type) {
    case actionTypes.RECEIVE_VIDEOS:
      const keys = Object.keys(state);
      // For now only cache current channels videos eg. remove videos from other channels
      if (keys.length) {
        if (state[keys[0]] !== action.username) {
          return {...action.payload};
        }
      }
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function isLoadingReducer(state = false, action) {
  switch (action.type) {
    default:
      return state;
  }
}


export default combineReducers({
  videos,
  isLoading: isLoadingReducer,
});

// Selectors
export const allVideos = (state, channel) => _.values(state.videos);
export const isLoading = state => state.isLoading;
