import * as utils from '../lib/utils';
import steem from '../lib/steemApi';
import {selectors} from "../reducers";
import {selectActiveAccount} from "../helpers/auth";

export const actionTypes = {
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  REMOVE_ACCOUNT: 'REMOVE_ACCOUNT',
  SET_ACTIVE_ACCOUNT: 'SET_ACTIVE_ACCOUNT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

function addAccount(username, keys) {
  utils.storagePut('accounts', {
    ...utils.storageGet('accounts'),
    [username]: keys,
  });
  return {
    type: actionTypes.ADD_ACCOUNT,
    username,
    keys,
  };
}

function removeAccount(username) {
  const newAccounts = {...utils.storageGet('accounts')};
  delete newAccounts[username];
  utils.storagePut('accounts', newAccounts);
  return {
    type: actionTypes.REMOVE_ACCOUNT,
    username,
  };
}

export function setActiveAccount(username) {
  utils.storagePut('activeAccount', username);
  return {
    type: actionTypes.SET_ACTIVE_ACCOUNT,
    username,
  };
}

export function steemLogin(username, postingKey) {
  console.log(username, postingKey);
  return dispatch => {
    if (!steem.auth.isWif(postingKey)) {
      return Promise.reject('Invalid posting key');
    }
    let pubPostingKey = steem.auth.wifToPublic(postingKey);
    return steem.api.getAccountsAsync([username])
      .then(result => {
        if (!result.length) {
          return Promise.reject('Username does not exist');
        }
        let account = result[0];
        let postingPublicKeys = account.posting.key_auths;
        for (let [publicKey] of postingPublicKeys) {
          if (publicKey === pubPostingKey) {
            dispatch(addAccount(username, {posting: postingKey}));
            dispatch(setActiveAccount(username));
            return Promise.resolve('Successfully logged in');
          }
        }
        return Promise.reject('Invalid posting key');
      })
  }
}

export function steemLogout() {
  return (dispatch, getState) => {
    const activeAccount = selectors.auth.activeAccountName(getState());
    dispatch(removeAccount(activeAccount));
    const newActiveAccount = selectActiveAccount(selectors.auth.getAccounts(getState()));
    dispatch(setActiveAccount(newActiveAccount));
  }
}
