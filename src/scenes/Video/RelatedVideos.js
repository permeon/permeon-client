import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import {getAppInfo} from "../../helpers/videoHelpers";
import StackedVideoCard from "../../components/VideoCards/StackedVideoCard";
import {selectors} from "../../reducers";
import {channelVideos} from "../../actions/channelActions";

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
        <Header as='h3'>Related videos</Header>
        {parseVideos(videos).slice(0, 7).map(video => (
          <StackedVideoCard key={video.url} {...video} />
        ))}
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
    playtime: '09:07',
    rewards: '$16.516',
    date: '5 hours ago',
    app: getAppInfo(video).appName,
  }));
}


RelatedVideos.propTypes = {};

function mapStateToProps(state, ownProps) {
  const channel = ownProps.video.author;
  return {
    videos: selectors.channels.allVideos(state, channel),
    channel,
  }
}

export default connect(mapStateToProps)(RelatedVideos);
