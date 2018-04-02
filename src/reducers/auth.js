import { combineReducers } from 'redux';

import { actionTypes } from '../actions/authActions';
import * as utils from '../lib/utils';

const defaultAccounts = utils.storageGet('accounts') || {};

function accounts(state = defaultAccounts, action) {
  let newState;
  switch (action.type) {
    case actionTypes.ADD_ACCOUNT:
      const newAccounts = { ...state };
      const account = newAccounts[action.username];
      newAccounts[action.username] = {
        ...account,
        keys: action.keys
      };
      return newAccounts;
    case actionTypes.REMOVE_ACCOUNT:
      newState = { ...state };
      delete newState[action.username];
      return newState;
    default:
      return state;
  }
}

const defaultActiveAccount = utils.storageGet('activeAccount') || '';

function activeAccount(state = defaultActiveAccount, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_ACCOUNT:
      return action.username;
    default:
      return state;
  }
}

export default combineReducers({
  accounts,
  activeAccount
});

// Selectors
export const isLoggedIn = state => !!state.activeAccount;
export const getAccounts = state =>
  Object.keys(state.accounts).map(username => ({ username, keys: state.accounts[username] }));
export const activeAccountName = state => state.activeAccount || '';
export const activeKeys = state => state.accounts[state.activeAccount] || '';
