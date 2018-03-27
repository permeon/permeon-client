import React from 'react';
import PropTypes from 'prop-types';
import GridVideoCard from "../../components/VideoCards/GridVideoCard";

const ChannelVideos = ({
  videos,
}) => {
  return (
    <div>
      {videos.map(video => (
        <GridVideoCard key={video.url} {...video} />
      ))}
    </div>
  );
};

ChannelVideos.propTypes = {

};

export default ChannelVideos;
