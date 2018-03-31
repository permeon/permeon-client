import React from 'react';
import PropTypes from 'prop-types';
import {youtubeToEmbedSrc} from "../../helpers/videoHelpers";

const VideoEmbed = ({ src }) => {
  if (!src) {
    return null;
  }
  return renderVideo(src);
};

function renderVideo(src) {
  if (src.match(/^https?:\/\/.*?.youtube\.com/)) {
    return renderYoutubeVideo(src);
  } else {
    return renderDefaultVideo(src);
  }
}

function renderYoutubeVideo(src) {
  const embedSrc = youtubeToEmbedSrc(src);
  return (
    <div style={{position:'relative', paddingBottom: '56.25%'}}>
      <iframe
        frameBorder="0"
        height="100%"
        width="100%"
        scrolling="no"
        src={embedSrc}
        allowFullScreen
        style={{position: 'absolute', top: 0, left: 0}}
      />
    </div>
  ) ;
}

function renderDefaultVideo(src) {
  return (
    <video src={src} controls width='100%' style={{border: 'none'}} />
  )
}

VideoEmbed.propTypes = {

};

export default VideoEmbed;
