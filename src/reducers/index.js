import { combineReducers } from "redux";

import authReducer, * as authSelectors from "./auth";
import channelsReducer, * as channelsSelectors from "./channels";
import settingsReducer, * as settingsSelectors from "./settings";
import videosReducer, * as videosSelectors from "./videos";

export default combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  settings: settingsReducer,
  videos: videosReducer,
});

export const selectors = {
  auth: {
    isLoggedIn: state => authSelectors.isLoggedIn(state.auth),
    getAccounts: state => authSelectors.getAccounts(state.auth),
    activeAccountName: state => authSelectors.activeAccountName(state.auth),
    activeKeys: state => authSelectors.activeKeys(state.auth),
  },
  channels: {
    allVideos: (state, channel) => channelsSelectors.allVideos(state.channels, channel),
    isFetchingVideos: state => channelsSelectors.isFetchingVideos(state.channels),
    videosToFetch: state => channelsSelectors.videosToFetch(state.channels),
    currentChannel: state => channelsSelectors.currentChannel(state.channels),
    videoPagination: state => channelsSelectors.videoPagination(state.channels),
  },
  settings: {
    all: state => settingsSelectors.all(state.settings),
  },
  videos: {
    trending: state => videosSelectors.trending(state.videos),
    created: state => videosSelectors.created(state.videos),
    hot: state => videosSelectors.hot(state.videos),
    feed: state => videosSelectors.feed(state.videos),
    isLoading: (state, category)=> videosSelectors.isLoading(state.videos, category),
  }
};
