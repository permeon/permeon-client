import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SMComment, Header, Button, Icon } from 'semantic-ui-react';

const Comment = ({
  children,
}) => {
  const author = 'louisthomas',
    date = 'Yesterday at 12:30AM',
    rewards = '$0.944',
    body = 'This has been very useful for my research. Thanks as well!',
    upvotes = 73,
    downvotes = 1

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
            <Button style={{background: 'none', padding: '2px 4px'}}>
              <Icon name='thumbs up'/>
              {upvotes}
            </Button>
          </SMComment.Action>
          <SMComment.Action>
            <Button style={{background: 'none', padding: '2px 4px'}}>
              <Icon name='thumbs down'/>
              {downvotes}
            </Button>
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
