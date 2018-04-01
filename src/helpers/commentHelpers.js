/**
 * Takes in a steem comment and builds a tree for displaying dom comments.
 * depth of 0 is the root post
 * depth of 1 is root level comments
 * add an array of comment objects to each comment
 * @param comments - a comment from the steem blockchain
 */
import {safeJsonParse} from "../lib/utils";

export function buildCommentTree(comments) {
  const rootComments = [];
  for (let comment of _.values(comments)) {
    if (comment.depth === 1) {
      rootComments.push(comment);
    }
  }
  return rootComments;
}

export function parseComments(comments) {
  const parsedComments = {};
  for (let comment of _.values(comments)) {
    const json_metadata = safeJsonParse(comment.json_metadata);
    if (!_.has(json_metadata, 'emoji')) {
      parsedComments[`${comment.author}/${comment.permlink}`] = {
        ...comments[`${comment.author}/${comment.permlink}`],
        json_metadata
      }
    }
  }
  return parsedComments;
}

export function rootComments(comments) {
  const rootComments = [];
  for (let comment of _.values(comments)) {
    if (comment.depth === 1) {
      rootComments.push(comment);
    }
  }
  return rootComments;
}
