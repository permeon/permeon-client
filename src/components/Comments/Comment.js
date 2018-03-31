import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header, Button, Icon } from 'semantic-ui-react';
import DownvoteButton from "../Buttons/DownvoteButton";
import UpvoteButton from "../Buttons/UpvoteButton";
import {countVotes} from "../../helpers/videoHelpers";

const Comment = ({
  author,
  date,
  rewards,
  body,
  upvotes,
  downvotes,
  replies,
  comments,
}) => {
  // Use "\2022" for bullet
  return (
    <SMComment>
      <SMComment.Avatar src={`https://steemitimages.com/u/${author}/avatar/`} />
      <SMComment.Content>
        <SMComment.Author as='a'>{author}</SMComment.Author>
        <SMComment.Metadata>
          <div>{date} <span style={{marginLeft: '4px'}}>{rewards}</span></div>
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
      <SMComment.Group>
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
      author={comment.author}
      date={comment.created}
      rewards='$0.944'
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
