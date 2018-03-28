import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Container, Button, Divider, Loader } from 'semantic-ui-react';

import { selectors } from '../../reducers';
import ChannelBanner from "./ChannelBanner";
import ChannelAbout from "./ChannelAbout";
import ChannelVideos from "./ChannelVideos";
import {channelVideos} from "../../actions/channelActions";
import styles from './Channel.css';
import {videoPagination} from "../../reducers/channels";

class Channel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'VIDEOS',
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.loadMoreVideos = this.loadMoreVideos.bind(this);
  }

  componentDidMount() {
    if (!this.props.videos.length) {
      this.props.dispatch(channelVideos(this.props.username));
    }
  }

  onMenuClick(event, {name}) {
    this.setState({ activeTab: name });
  }

  loadMoreVideos() {
    const { start_author, start_permlink } = this.props.videoPagination;
    this.props.dispatch(channelVideos(
      this.props.username, 50, start_author, start_permlink
    ));
  }

  renderActive(activeTab) {
    if (activeTab === 'VIDEOS') {
      return <ChannelVideos videos={this.props.videos} />;
    } else if (activeTab === 'ABOUT') {
      return <ChannelAbout />;
    }
      return null;
  }

  render() {
    const { username, moreVideosToLoad, isLoadingVideos } = this.props;
    const { activeTab } = this.state;
    // TODO: put urls into config
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
        <Container className={styles.ContentContainer}>
          <Menu pointing secondary tabular attached='top' className={styles.ChannelMenu}>
            <Menu.Item name='VIDEOS' active={activeTab === 'VIDEOS'} onClick={this.onMenuClick} />
            <Menu.Item name='ABOUT' active={activeTab === 'ABOUT'} onClick={this.onMenuClick} />
          </Menu>
          {this.renderActive(activeTab)}
          <Loader active={isLoadingVideos} size='large'/>
          {moreVideosToLoad && <Divider clearing />}
          {moreVideosToLoad && <Button onClick={this.loadMoreVideos} floated='right'>more</Button>}
        </Container>
      </div>
    );
  }
}

Channel.propTypes = {};

function mapStateToProps(state, ownProps) {
  const username = ownProps.match.params.username;
  return {
    username,
    videos: selectors.channels.allVideos(state, username),
    isLoadingVideos: selectors.channels.isFetchingVideos(state),
    videoPagination: selectors.channels.videoPagination(state),
    moreVideosToLoad: !!Object.keys(selectors.channels.videoPagination(state)).length,
  }
}

export default connect(mapStateToProps)(Channel);
