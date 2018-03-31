import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header, Button, Icon } from 'semantic-ui-react';
import DownvoteButton from "../Buttons/DownvoteButton";
import UpvoteButton from "../Buttons/UpvoteButton";

const Comment = ({
  author,
  date,
  rewards,
  body,
  upvotes,
  downvotes,
  children,
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
        {children.map(child => (
          <Comment key={child.id} children={[]}/>
        ))}
      </SMComment.Group>
    </SMComment>
  );
};

Comment.propTypes = {

};

export default Comment;
