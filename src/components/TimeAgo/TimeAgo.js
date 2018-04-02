import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

const TimeAgoWrapper = ({ date }) => {
  return <TimeAgo date={date} formatter={formatter} />;
};

function formatter(value, unit, suffix, date, defaultParser) {
  if (unit === 'second') {
    return 'just now';
  } else {
    return value + ' ' + unit + (value > 1 ? 's' : '') + ' ' + suffix.replace('from now', 'ago');
  }
}

TimeAgoWrapper.propTypes = {};

export default TimeAgoWrapper;
