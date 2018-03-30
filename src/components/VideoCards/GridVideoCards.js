import React from 'react';
import PropTypes from 'prop-types';
import GridVideoCard from "../../components/VideoCards/GridVideoCard";

import styles from './GridVideoCards.css';
import {getAppInfo} from "../../helpers/videoHelpers";

const GridVideoCards = ({
  videos,
}) => {
  return (
    <div className={styles.ChannelVideos}>
      {parseVideos(videos).map(video => (
        <GridVideoCard key={video.url} {...video} />
      ))}
    </div>
  );
};

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

GridVideoCards.propTypes = {

};

export default GridVideoCards;
