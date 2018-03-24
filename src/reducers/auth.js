import { combineReducers } from 'react-redux';

import { actionTypes } from "../actions/authActions";
import * as utils from "../lib/utils";

const defaultAccounts = utils.storageGet('accounts');

function accounts(state = defaultAccounts, action) {
  switch (action.type) {
    case actionTypes.ADD_ACCOUNT:
      const newAccounts = {...state};
      const account = newAccounts[action.username];
      newAccounts[action.username] = {
        ...account,
        keys: action.keys,
      };
      return newAccounts;
    default:
      return state;
  }
}

const defaultActiveAccount = utils.storageGet('activeAccount');

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
  activeAccount,
});

export const isLoggedIn = state => state.activeAccount;
