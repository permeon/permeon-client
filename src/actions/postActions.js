import steem from '../lib/steemApi';

import {selectors} from "../reducers";
import { getAppJsonMetadata, generatePermlink } from "../helpers/postHelpers";

export const actionTypes = {
};

export function postVideo({ link, title, body, tags }) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const author = selectors.auth.activeAccountName(state);
    const jsonMetadata = JSON.stringify({
      tags,
      app: getAppJsonMetadata(),
    });
    return steem.broadcast.commentAsync(
      postingKey,
      '',
      'paramount-tag',
      author,
      generatePermlink(),
      title,
      body,
      jsonMetadata,
    );
  }
}
