import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChannelBanner from "./ChannelBanner";

class Channel extends Component {

  render() {
    const { username } = this.props;
    const bannerUrl = 'https://img.esteem.ws/jz7gqt5t2c.jpg';
    const avatarUrl = `https://steemitimages.com/u/${username}/avatar/`;
    return (
      <div>
        <ChannelBanner
          username={username}
          bannerUrl={bannerUrl}
          avatarUrl={avatarUrl}
          onSubscribe={() => alert('not implemented')}
        />
      </div>
    );
  }
}

Channel.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    username: ownProps.match.params.username,
  }
}

export default connect(mapStateToProps)(Channel);
