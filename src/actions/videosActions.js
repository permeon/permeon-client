import steem from '../lib/steemApi';
import config from "../config";

import { selectors } from "../reducers";
import {getVideoPosts} from "../helpers/videoHelpers";
import {transformPayload} from "../lib/utils";

export const actionTypes = {
  RECEIVE_VIDEOS: '@video/RECEIVE_VIDEOS',
  SET_PAGINATION: '@video/SET_PAGINATION',
  SET_VIDEOS_FETCHING_STATUS: '@video/SET_VIDEOS_FETCHING_STATUS',
};

function setVideosFetching(isFetching, category) {
  return {
    type: actionTypes.SET_VIDEOS_FETCHING_STATUS,
    isFetching,
    category,
  }
}

function receiveVideos(videos, category) {
  return {
    type: actionTypes.RECEIVE_VIDEOS,
    payload: videos,
    category,
  }
}

export function fetchTrending(tag, limit=20, start_author='', permlink='') {
  const category = 'trending';
  return (dispatch, getState) => {
    if (selectors.videos.isLoading(getState(), category)) {
      return Promise.resolve();
    }
    dispatch(setVideosFetching(true, category));
    return steem.api.getDiscussionsByTrendingAsync({tag, limit, start_author, permlink})
      .then(response => {
        const videoPosts = getVideoPosts(response);
        dispatch(receiveVideos(videoPosts, category));
        dispatch(setVideosFetching(false, category));
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(setVideosFetching(false, category));
      });
  }
}

export function fetchCreated(tag, limit=20, start_author='', permlink='') {
  const category = 'created';
  return (dispatch, getState) => {
    if (selectors.videos.isLoading(getState(), category)) {
      return Promise.resolve();
    }
    dispatch(setVideosFetching(true, category));
    return steem.api.getDiscussionsByCreatedAsync({tag, limit, start_author, permlink})
      .then(response => {
        const videoPosts = getVideoPosts(response);
        dispatch(receiveVideos(videoPosts, category));
        dispatch(setVideosFetching(false, category));
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(setVideosFetching(false, category));
      });
  }
}

export function fetchHot(tag, limit=20, start_author='', permlink='') {
  const category = 'hot';
  return (dispatch, getState) => {
    if (selectors.videos.isLoading(getState(), category)) {
      return Promise.resolve();
    }
    dispatch(setVideosFetching(true, category));
    return steem.api.getDiscussionsByHotAsync({tag, limit, start_author, permlink})
      .then(response => {
        const videoPosts = getVideoPosts(response);
        dispatch(receiveVideos(videoPosts, category));
        dispatch(setVideosFetching(false, category));
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(setVideosFetching(false, category));
      });
  }
}

export function fetchFeed(tag, limit=20, start_author='', permlink='') {
  const category = 'feed';
  return (dispatch, getState) => {
    if (selectors.videos.isLoading(getState(), category)) {
      return Promise.resolve();
    }
    dispatch(setVideosFetching(true, category));
    return steem.api.getDiscussionsByFeedAsync({tag, limit, start_author, permlink})
      .then(response => {
        const videoPosts = getVideoPosts(response);
        dispatch(receiveVideos(videoPosts, category));
        dispatch(setVideosFetching(false, category));
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(setVideosFetching(false, category));
      });
  }
}

