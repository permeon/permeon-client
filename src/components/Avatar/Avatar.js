import React from 'react';
import PropTypes from 'prop-types';
import {Image} from "semantic-ui-react";

const Avatar = ({ username }) => {
  return (
    <div>
      <Image avatar src={`https://steemitimages.com/u/${username}/avatar/`} />
      {username}
    </div>
  );
};

Avatar.propTypes = {

};

export default Avatar;
