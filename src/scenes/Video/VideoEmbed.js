import React from 'react';
import PropTypes from 'prop-types';

const VideoEmbed = ({ video }) => {
  const youtubeID = video.url;

  return (
    <div style={{position:'relative', paddingBottom: '56.25%'}}>
      <iframe
        frameBorder="0"
        height="100%"
        width="100%"
        scrolling="no"
        src={`https://www.youtube.com/embed/${youtubeID}`}
        allowFullScreen
        style={{position: 'absolute', top: 0, left: 0}}
      />
    </div>
  );
};

VideoEmbed.propTypes = {

};

export default VideoEmbed;
