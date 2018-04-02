import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const DownvoteButton = ({ downvotes, type, onClick = () => alert('not implemented'), style }) => {
  return (
    <Button style={{ background: 'none', padding: '10px', ...style }} onClick={onClick}>
      <Icon name="thumbs down" />
      {downvotes}
    </Button>
  );
};

DownvoteButton.propTypes = {};

export default DownvoteButton;
