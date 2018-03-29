import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {getAppInfo} from "../../helpers/channelHelpers";
import StackedVideoCard from "../../components/VideoCards/StackedVideoCard";

class RelatedVideos extends Component {
  render() {
    const { videos } = this.props;
    return (
      <div>
        {parseVideos(videos).map(video => (
          <StackedVideoCard key={video.url} {...video} />
        ))}
      </div>
    );
  }
}

function parseVideos(videos) {
  return videos.map(video => ({
    url: `/channel/${video.author}/${video.permlink}`,
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
  return {
    videos: [
      {
        author: 'louisthomas',
        title: 'Study: 81% of ICOs are SCAMS',
        permlink: 'hdspgfw77',
        json_metadata: {
          app: 'dtube/0.7',
        },
        videoData: {
          thumbnail: 'https://ipfs.io/ipfs/QmZQiScyAPoqdLaP2fwxTxWjab6pAPkFSSViagpaCpkChA',
        },
      },
      {
        author: 'louisthomas',
        title: 'Study: 81% of ICOs are SCAMS',
        permlink: 'hdspgfw7',
        json_metadata: {
          app: 'dtube/0.7',
        },
        videoData: {
          thumbnail: 'https://ipfs.io/ipfs/QmZQiScyAPoqdLaP2fwxTxWjab6pAPkFSSViagpaCpkChA',
        },
      },
      {
        author: 'louisthomas',
        title: 'Study: 81% of ICOs are SCAMS',
        permlink: 'hdspgfw78',
        json_metadata: {
          app: 'dtube/0.7',
        },
        videoData: {
          thumbnail: 'https://ipfs.io/ipfs/QmZQiScyAPoqdLaP2fwxTxWjab6pAPkFSSViagpaCpkChA',
        },
      },
      {
        author: 'louisthomas',
        title: 'Study: 81% of ICOs are SCAMS',
        permlink: 'hdspgfw79',
        json_metadata: {
          app: 'dtube/0.7',
        },
        videoData: {
          thumbnail: 'https://ipfs.io/ipfs/QmZQiScyAPoqdLaP2fwxTxWjab6pAPkFSSViagpaCpkChA',
        },
      },
    ],
  }
}

export default connect(mapStateToProps)(RelatedVideos);
