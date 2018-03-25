import { combineReducers } from "redux";

import authReducer, * as authSelectors from "./auth";

export default combineReducers({
  auth: authReducer,
});

/**
 * Wraps a root level selector
 * @param selectors and object of selector functions
 * @param subState the part of the state tree to pass to the selector
 * @returns {{}}
 */
function wrapSelectors(selectors, subState) {
  const newSelectors = {...selectors};
  for (const key of Object.keys(selectors)) {
    if (key !== 'default') {
      newSelectors[key] = state => selectors[key](state[subState]);
    }
  }
  return newSelectors;
}

// Auth Selectors
export const selectors = {
  auth: {
    isLoggedIn: state => authSelectors.isLoggedIn(state.auth),
    getAccounts: state => authSelectors.getAccounts(state.auth),
    activeAccountName: state => authSelectors.activeAccountName(state.auth),
  },
};
