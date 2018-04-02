import _ from 'lodash';

import { safeJsonParse } from '../lib/utils';

export function parseReactions(posts) {
  const parsedReactions = {};
  for (let post of _.values(posts)) {
    const json_metadata = safeJsonParse(post.json_metadata);
    if (_.has(json_metadata, 'emoji')) {
      parsedReactions[`${post.author}/${post.permlink}`] = {
        ...posts[`${post.author}/${post.permlink}`],
        json_metadata
      };
    }
  }
  return parsedReactions;
}
