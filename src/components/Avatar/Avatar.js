import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const Avatar = ({ username, ...rest }) => {
  return <Image avatar src={`https://steemitimages.com/u/${username}/avatar/`} {...rest} />;
};

Avatar.propTypes = {};

export default Avatar;
