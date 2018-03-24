import { combineReducers } from "redux";

import auth from "./auth";

export default combineReducers({
  auth,
});

// Selectors
export const isLoggedIn = state => state.auth;
