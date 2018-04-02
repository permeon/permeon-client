import steem from '../lib/steemApi';
import config from '../config';

import { selectors } from '../reducers';
import { getAppJsonMetadata, generatePermlink } from '../helpers/postHelpers';

export const actionTypes = {};

const { APP_NAME, POST_BENEFICIARY_FEE } = config.pick('APP_NAME', 'POST_BENEFICIARY_FEE');

export function postVideo({ link, title, body, tags, thumbnail }) {
  return (dispatch, getState) => {
    const state = getState();
    const postingKey = selectors.auth.activeKeys(state).posting;
    const author = selectors.auth.activeAccountName(state);
    const rootTag = tags.length ? tags[0] : APP_NAME;
    const jsonMetadata = JSON.stringify({
      tags,
      link,
      thumbnail,
      app: getAppJsonMetadata()
    });
    tags.push(APP_NAME);
    const beneficiaries = [{ account: APP_NAME, weight: POST_BENEFICIARY_FEE }];
    const generatedPermlink = generatePermlink();

    return commentWithBeneficiary(
      postingKey,
      '',
      rootTag,
      author,
      generatedPermlink,
      title,
      body,
      jsonMetadata,
      beneficiaries
    ).then(response => {
      return `/${rootTag}/@${author}/${generatedPermlink}`;
    });
  };
}

function commentWithBeneficiary(
  wif,
  parentAuthor,
  parentPermlink,
  author,
  permlink,
  title,
  body,
  jsonMetadata,
  beneficiaries
) {
  const operations = [
    [
      'comment',
      {
        parent_author: parentAuthor,
        parent_permlink: parentPermlink,
        author,
        permlink,
        title,
        body,
        json_metadata: jsonMetadata
      }
    ],
    [
      'comment_options',
      {
        author,
        permlink,
        max_accepted_payout: '1000000.000 SBD',
        percent_steem_dollars: 10000,
        allow_votes: true,
        allow_curation_rewards: true,
        extensions: [
          [
            0,
            {
              beneficiaries
            }
          ]
        ]
      }
    ]
  ];

  return steem.broadcast.sendAsync({ operations, extensions: [] }, { posting: wif });
}
