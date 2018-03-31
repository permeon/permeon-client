import React from 'react';
import PropTypes from 'prop-types';

const VideoEmbed = ({ src }) => {
  return renderVideo(src);
};

function renderVideo(src) {
  if (src.match(/^https?:\/\/.*?.youtube\.com\/embed/)) {
    return renderYoutubeVideo(src)
  } else {
    return renderDefaultVideo(src);
  }
}

function renderYoutubeVideo(src) {
  return (
    <div style={{position:'relative', paddingBottom: '56.25%'}}>
      <iframe
        frameBorder="0"
        height="100%"
        width="100%"
        scrolling="no"
        src={src}
        allowFullScreen
        style={{position: 'absolute', top: 0, left: 0}}
      />
    </div>
  ) ;
}

function renderDefaultVideo(src) {
  return (
    <video src={src} controls width='100%' style={{border: 'none'}}>

    </video>
  )
}

VideoEmbed.propTypes = {

};

export default VideoEmbed;
