/**
 * Access client config / constants through ./config.
 * Don't access proccess.env anywhere else but config files.
 */
import _ from 'lodash';

let config = {};
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'development') {
  config = require('./dev.config').default;
  console.log('config:', config);
} else if (nodeEnv === 'production') {
  config = require('./prod.config').default;
}

function pick(...paths) {
  if (typeof paths === 'string') {
    if (!_.has(config, paths)) {
      throw new Error(`config var ${path} is not defined`);
    }
  } else {
    for (let path of paths) {
      if (!_.has(config, path)) {
        throw new Error(`config var ${path} is not defined`);
      }
    }
  }

  return _.pick(config, paths);
}

export default {
  pick
};
