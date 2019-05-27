import steem from '../lib/steemApi';
import config from '../config';

import { selectors } from '../reducers';
import { getVideoPosts } from '../helpers/videoHelpers';
import { transformPayload } from '../lib/utils';

export const actionTypes = {
  RECEIVE_VIDEOS: 'RECEIVE_VIDEOS',
  SET_VIDEOS_FETCHING_STATUS: 'SET_VIDEOS_FETCHING_STATUS',
  SET_CHANNEL_VIDEOS_PAGINATION: 'SET_CHANNEL_VIDEOS_PAGINATION'
};

function setVideosFetching(isFetching) {
  return {
    type: actionTypes.SET_VIDEOS_FETCHING_STATUS,
    isFetching
  };
}

export function channelVideos(username, limit = 20, start_author = '', start_permlink = '') {
  return (dispatch, getState) => {
    if (selectors.channels.isFetchingVideos(getState())) {
      return Promise.resolve();
    }
    const query = { tag: username, limit, truncate_body: 1, start_author, start_permlink };
    dispatch(setVideosFetching(true));
    return steem.api
      .getDiscussionsByBlogAsync(query)
      .then(response => {
        const videoPosts = getVideoPosts(response).filter(post => post.author === username);
        dispatch({
          type: actionTypes.RECEIVE_VIDEOS,
          payload: transformPayload(videoPosts, 'post_id'),
          username
        });
        dispatch(setVideosFetching(false));
        if (response.length === limit) {
          const lastVideo = response[response.length - 1];
          dispatch({
            type: actionTypes.SET_CHANNEL_VIDEOS_PAGINATION,
            pagination: { start_author: lastVideo.author, start_permlink: lastVideo.permlink }
          });
        } else {
          dispatch({
            type: actionTypes.SET_CHANNEL_VIDEOS_PAGINATION,
            pagination: {}
          });
        }
      })
      .catch(error => {
        console.log('error:', error);
        dispatch(setVideosFetching(false));
      });
  };
}
