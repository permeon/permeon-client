import * as utils from '../lib/utils';
import steem from '../lib/steemApi';

export const actionTypes = {
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  SET_ACTIVE_ACCOUNT: 'SET_ACTIVE_ACCOUNT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export function addAccount(username, keys) {
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
            return Promise.resolve('Successfully logged in');
          }
        }
        return Promise.reject('Invalid posting key');
      })
  }
}

export function steemLogout() {
  throw new Error('not implemented');
}
