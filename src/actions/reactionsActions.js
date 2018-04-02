import steem from '../lib/steemApi';
import config from '../config';
import _ from 'lodash';

import { selectors } from '../reducers';
import { getAppJsonMetadata, generatePermlink } from '../helpers/postHelpers';

export const actionTypes = {
  RECEIVE_REACTIONS: '@reactions/RECEIVE_REACTIONS'
};

const { APP_NAME, POST_BENEFICIARY_FEE } = config.pick('APP_NAME', 'POST_BENEFICIARY_FEE');

export function receiveReactions(channel, permlink, payload) {
  return {
    type: actionTypes.RECEIVE_REACTIONS,
    channel,
    permlink,
    payload
  };
}

export function postReaction(channel, videoPermlink, emoji) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const author = selectors.auth.activeAccountName(state);
    const jsonMetadata = JSON.stringify({
      emoji,
      app: getAppJsonMetadata()
    });

    const generatedPermlink = `${videoPermlink}-${generatePermlink()}`;
    // Cheat to make ui appear like adding emoji is instant
    const reactionsPayload = {
      [`${channel}/${generatedPermlink}`]: {
        author: channel,
        json_metadata: {
          emoji
        }
      }
    };
    dispatch(receiveReactions(channel, videoPermlink, reactionsPayload));
    return steem.broadcast
      .commentAsync(
        postingKey,
        channel,
        videoPermlink,
        author,
        generatedPermlink,
        '', // title
        // '🍇', //
        _.get(emoji, 'native'), // body (cant be blank so use native emoji)
        jsonMetadata
      )
      .then(response => {})
      .catch(error => {
        console.log('error:', error);
      });
  };
}
