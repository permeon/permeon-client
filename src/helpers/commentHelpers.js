/**
 * Takes in a steem comment and builds a tree for displaying dom comments.
 * depth of 0 is the root post
 * depth of 1 is root level comments
 * add an array of comment objects to each comment
 * @param comments - a comment from the steem blockchain
 */
export function buildCommentTree(comments) {
  const rootComments = [];
  for (let comment of _.values(comments)) {
    if (comment.depth === 1) {
      rootComments.push(comment);
    }
  }

  console.log('comments:', comments);
  // for (let comment of _.values(comments)) {
  //   if (comment.depth > 1) {
  //     const parent = `${comment.parent_author}/${comment.parent_permlink}`;
  //     console.log('parent:', parent, comments[parent]);
  //     if (!comments[parent]._childComments) {
  //       comments[parent]._childComments = [];
  //     }
  //     comments[parent]._childComments.push(comment);
  //   }
  // }

  return rootComments;
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
