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

function isFetchingVideosReducer(state = false, action) {
  switch (action.type) {
    case actionTypes.SET_VIDEOS_FETCHING_STATUS:
      return action.isFetching;
    default:
      return state;
  }
}

function videoPaginationReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_CHANNEL_VIDEOS_PAGINATION:
      return {...action.pagination};
    default:
      return state;
  }
}


export default combineReducers({
  videos,
  isFetchingVideos: isFetchingVideosReducer,
  videoPagination: videoPaginationReducer,
});

// Selectors
export const allVideos = (state, channel) => _.sortBy(_.values(state.videos), ['created']).reverse();
export const isFetchingVideos = state => state.isFetchingVideos;
export const videoPagination = state => state.videoPagination;
export const currentChannel = state => {
  const videos = _.values(state.videos);
  return videos.length ? videos[0].author : '';
};
export const pagination = state => {
  const { author, permlink } = _.pick(_.values(state.videos)[0], ['author', 'permlink']);
  return { start_author: author, start_permlink: permlink };
};
