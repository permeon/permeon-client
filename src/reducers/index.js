import { combineReducers } from "redux";

import authReducer, * as authSelectors from "./auth";
import channelsReducer, * as channelsSelectors from "./channels";

export default combineReducers({
  auth: authReducer,
  channels: channelsReducer,
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
  },
};
