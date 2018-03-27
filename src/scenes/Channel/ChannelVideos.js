import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import GridVideoCard from "../../components/VideoCards/GridVideoCard";

import styles from './ChannelVideos.css';
import {getAppInfo} from "../../helpers/channelHelpers";

const ChannelVideos = ({
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
  const cardData = [];
  videos.forEach(video => {
    console.log('video:', video);
    console.log('app', getAppInfo(video));
    cardData.push({
      url: `/channel/${video.author}/${video.permlink}`,
      title: video.title,
      username: video.author,
      thumbnail: video.videoData.thumbnail,
      playtime: '09:07',
      rewards: '$16.516',
      date: '5 hours ago',
      app: getAppInfo(video).appName,
    });
  });
  return cardData;
}

ChannelVideos.propTypes = {

};

export default ChannelVideos;
