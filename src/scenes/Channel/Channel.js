import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Button, Divider, Loader } from 'semantic-ui-react';

import { selectors } from '../../reducers';
import ChannelBanner from './ChannelBanner';
import ChannelAbout from './ChannelAbout';
import GridVideoCardLayout from '../../components/VideoCards/GridVideoCardLayout';
import GridVideoCards from '../../components/VideoCards/GridVideoCards';
import { channelVideos } from '../../actions/channelActions';
import {
  subscribe,
  unSubscribe,
  subscriptionCount,
  subscriptions,
  allSubscriptions
} from '../../actions/subscriptionsActions';
import styles from './Channel.css';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'VIDEOS'
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.loadMoreVideos = this.loadMoreVideos.bind(this);
    this.onSubscribeClick = this.onSubscribeClick.bind(this);
    this.onUnSubscribeClick = this.onUnSubscribeClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.videos.length) {
      this.props.dispatch(channelVideos(this.props.username));
    }
    // this.props.dispatch(subscriptionCount(this.props.username));
    if (!this.props.mySubscriptions) {
      this.props.dispatch(subscriptions());
    }
  }

  onSubscribeClick() {
    this.props.dispatch(subscribe(this.props.username));
  }

  onUnSubscribeClick() {
    this.props.dispatch(unSubscribe(this.props.username));
  }

  onMenuClick(event, { name }) {
    this.setState({ activeTab: name });
  }

  loadMoreVideos() {
    const { start_author, start_permlink } = this.props.videoPagination;
    this.props.dispatch(channelVideos(this.props.username, 50, start_author, start_permlink));
  }

  renderActive(activeTab) {
    if (activeTab === 'VIDEOS') {
      return <GridVideoCards videos={this.props.videos} />;
    } else if (activeTab === 'ABOUT') {
      return <ChannelAbout />;
    }
    return null;
  }

  render() {
    const {
      username,
      moreVideosToLoad,
      isLoadingVideos,
      isSubscribedTo,
      isSubbingUnsubbing,
      channelAccount
    } = this.props;
    const { activeTab } = this.state;
    // TODO: put urls into config
    const avatarUrl = `https://steemitimages.com/u/${username}/avatar/`;

    return (
      <div>
        <ChannelBanner
          username={username}
          bannerUrl={channelAccount.bannerUrl}
          avatarUrl={avatarUrl}
          isSubscribed={isSubscribedTo}
          onSubscribe={this.onSubscribeClick}
          onUnSubscribe={this.onUnSubscribeClick}
          isSubButtonLoading={isSubbingUnsubbing}
        />
        <GridVideoCardLayout>
          <Menu pointing secondary tabular attached="top" className={styles.ChannelMenu}>
            <Menu.Item name="VIDEOS" active={activeTab === 'VIDEOS'} onClick={this.onMenuClick} />
            <Menu.Item name="ABOUT" active={activeTab === 'ABOUT'} onClick={this.onMenuClick} />
          </Menu>
          {this.renderActive(activeTab)}
          <Loader active={isLoadingVideos} size="large" />
          {moreVideosToLoad && <Divider clearing />}
          {moreVideosToLoad && (
            <Button onClick={this.loadMoreVideos} floated="right">
              more
            </Button>
          )}
        </GridVideoCardLayout>
      </div>
    );
  }
}

Channel.propTypes = {};

function mapStateToProps(state, ownProps) {
  const username = ownProps.match.params.username;
  const activeAccount = selectors.auth.activeAccountName(state);
  return {
    username,
    videos: selectors.channels.allVideos(state, username),
    isLoadingVideos: selectors.channels.isFetchingVideos(state),
    videoPagination: selectors.channels.videoPagination(state),
    moreVideosToLoad: !!Object.keys(selectors.channels.videoPagination(state)).length,
    isSubscribedTo: selectors.subscriptions.isSubscribedTo(state, activeAccount, username),
    mySubscriptions: selectors.subscriptions.mySubscriptions(state, activeAccount),
    isSubbingUnsubbing: selectors.subscriptions.isSubbingUnsubbing(state, activeAccount, username),
    channelAccount: {} // TODO: get account from chian
  };
}

export default connect(mapStateToProps)(Channel);
