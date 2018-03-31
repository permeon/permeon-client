import { combineReducers } from "redux";

import authReducer, * as authSelectors from "./auth";
import channelsReducer, * as channelsSelectors from "./channels";
import settingsReducer, * as settingsSelectors from "./settings";
import videosReducer, * as videosSelectors from "./videos";
import subscriptionsReducer, * as subscriptionsSelectors from "./subscriptions";
import videoReducer, * as videoSelectors from "./video";
import commentsReducer, * as commentsSelectors from "./comments";

export default combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  settings: settingsReducer,
  videos: videosReducer,
  subscriptions: subscriptionsReducer,
  video: videoReducer,
  comments: commentsReducer,
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
  },
  subscriptions: {
    isSubscribedTo: (state, account, channel) => subscriptionsSelectors.isSubscribedTo(state.subscriptions, account, channel),
    mySubscriptions: (state, account) => subscriptionsSelectors.mySubscriptions(state.subscriptions, account),
    isSubbingUnsubbing: (state, account, channel) => subscriptionsSelectors.isSubbingUnsubbing(state.subscriptions, account, channel),
    subscriberCount: (state, channel) => subscriptionsSelectors.subscriberCount(state.subscriptions, channel),
    subscriberCountLoading: (state, channel) => subscriptionsSelectors.subscriberCountLoading(state.subscriptions, channel),
  },
  video: {
    video: (state, channel) => videoSelectors.video(state.video, channel),
  },
  comments: {
    all: (state, channel, permlink) => commentsSelectors.all(state.comments, channel, permlink),
  }
};
