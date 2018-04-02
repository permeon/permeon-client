import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const UpvoteButton = ({ upvotes, type, onClick = () => alert('not implemented'), style }) => {
  return (
    <Button style={{ background: 'none', padding: '10px', ...style }} onClick={onClick}>
      <Icon name="thumbs up" />
      {upvotes}
    </Button>
  );
};

UpvoteButton.propTypes = {};

export default UpvoteButton;
