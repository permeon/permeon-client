import React from 'react';
import PropTypes from 'prop-types';
import GridVideoCard from "../../components/VideoCards/GridVideoCard";

import styles from './ChannelVideos.css';

const ChannelVideos = ({
  videos,
}) => {
  return (
    <div className={styles.ChannelVideos}>
      {videos.map(video => (
        <GridVideoCard key={video.url} {...video} />
      ))}
    </div>
  );
};

ChannelVideos.propTypes = {

};

export default ChannelVideos;
