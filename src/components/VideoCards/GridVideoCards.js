import React from 'react';
import PropTypes from 'prop-types';
import GridVideoCard from "../../components/VideoCards/GridVideoCard";

import styles from './GridVideoCards.css';
import {formatDuration, getAppInfo} from "../../helpers/videoHelpers";
import {totalPostRewards} from "../../helpers/rewardsHelpers";

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
    url: `/v${video.url}`,
    title: video.title,
    username: video.author,
    thumbnail: video.videoData.thumbnail,
    playtime: formatDuration(video.videoData.duration),
    rewards: totalPostRewards(video),
    date: video.created,
    app: getAppInfo(video).appName,
  }));
}

GridVideoCards.propTypes = {

};

export default GridVideoCards;
