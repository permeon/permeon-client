import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header, Button, Icon } from 'semantic-ui-react';
import DownvoteButton from "../Buttons/DownvoteButton";
import UpvoteButton from "../Buttons/UpvoteButton";
import {countVotes} from "../../helpers/videoHelpers";
import TimeAgo from "../TimeAgo/TimeAgo";
import {formatRewards, totalPostRewards} from "../../helpers/rewardsHelpers";

const Comment = ({
  author,
  date,
  rewards,
  body,
  upvotes,
  downvotes,
  replies,
  comments,
  depth,
}) => {
  // Use "\2022" for bullet
  const style = {};
  if (depth > 0) {
    style['marginBottom'] = 0;
    style['paddingBottom'] = 0;
  }
  return (
    <SMComment>
      <SMComment.Avatar src={`https://steemitimages.com/u/${author}/avatar/`} />
      <SMComment.Content>
        <SMComment.Author as='a'>{author}</SMComment.Author>
        <SMComment.Metadata>
          <div><TimeAgo date={date}/><span style={{marginLeft: '4px'}}>{formatRewards(rewards)}</span></div>
        </SMComment.Metadata>
        <SMComment.Text>
          <p>{body}</p>
        </SMComment.Text>
        <SMComment.Actions>
          <SMComment.Action>
            <UpvoteButton upvotes={upvotes} style={{padding: '2px 4px'}}/>
          </SMComment.Action>
          <SMComment.Action>
            <DownvoteButton downvotes={downvotes} style={{padding: '2px 4px'}}/>
          </SMComment.Action>
          <SMComment.Action>Reply</SMComment.Action>
        </SMComment.Actions>
      </SMComment.Content>
      <SMComment.Group style={style}>
        {replies.map(child => (
          renderChild(comments[child], comments)
         ))}
      </SMComment.Group>
    </SMComment>
  );
};

function renderChild(comment, comments) {
  const { upvotes, downvotes } = countVotes(comment.active_votes);
  return (
    <Comment
      key={comment.author+comment.permlink}
      depth={comment.depth}
      author={comment.author}
      date={comment.created}
      rewards={totalPostRewards(comment)}
      body={comment.body}
      upvotes={upvotes}
      downvotes={downvotes}
      replies={comment.replies}
      comments={comments}
    />
  );
}

Comment.propTypes = {

};

export default Comment;
