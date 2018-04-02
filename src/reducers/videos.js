import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from '../actions/videosActions';

function createVideosReducer(category) {
  function videosReducer(state = [], action) {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case actionTypes.RECEIVE_VIDEOS:
        return [...state, ...action.payload];
      default:
        return state;
    }
  }

  function isFetchingReducer(state = false, action) {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case actionTypes.SET_VIDEOS_FETCHING_STATUS:
        return action.isFetching;
      default:
        return state;
    }
  }

  function paginationReducer(state = {}, action) {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case actionTypes.SET_PAGINATION:
        return { ...action.pagination };
      default:
        return state;
    }
  }

  return combineReducers({
    videos: videosReducer,
    isFetching: isFetchingReducer,
    pagination: paginationReducer
  });
}

export default combineReducers({
  trending: createVideosReducer('trending'),
  created: createVideosReducer('created'),
  hot: createVideosReducer('hot'),
  feed: createVideosReducer('feed')
});

// Selectors
export const trending = state => state.trending.videos;
export const created = state => state.created.videos;
export const hot = state => state.hot.videos;
export const feed = state => state.feed.videos;
export const isLoading = (state, category) => state[category].isFetching;
