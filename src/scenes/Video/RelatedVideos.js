import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { formatDuration, getAppInfo } from '../../helpers/videoHelpers';
import StackedVideoCard from '../../components/VideoCards/StackedVideoCard';
import { selectors } from '../../reducers';
import { channelVideos } from '../../actions/channelActions';
import { totalPostRewards } from '../../helpers/rewardsHelpers';

class RelatedVideos extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.videos.length) {
      this.props.dispatch(channelVideos(this.props.channel));
    }
  }

  render() {
    const { videos } = this.props;
    return (
      <div>
        <Header as="h3">Related videos</Header>
        {parseVideos(videos)
          .slice(0, 7)
          .map(video => <StackedVideoCard key={video.url} {...video} />)}
      </div>
    );
  }
}

function parseVideos(videos) {
  return videos.map(video => ({
    url: `/v${video.url}`,
    title: video.title,
    username: video.author,
    thumbnail: video.videoData.thumbnail,
    playtime: formatDuration(video.videoData.duration),
    rewards: totalPostRewards(video), //'$16.516',
    date: video.created,
    app: getAppInfo(video).appName
  }));
}

RelatedVideos.propTypes = {};

function mapStateToProps(state, ownProps) {
  const channel = ownProps.video.author;
  return {
    videos: selectors.channels.allVideos(state, channel),
    channel
  };
}

export default connect(mapStateToProps)(RelatedVideos);
