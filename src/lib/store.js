import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from './apiMiddleware';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import geoApp from '../reducers';

const logger = createLogger({
  collapsed: true
});

export default createStore(geoApp, applyMiddleware(apiMiddleware, thunk, logger));
