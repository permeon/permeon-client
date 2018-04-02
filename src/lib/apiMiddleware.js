import axios from 'axios';

import * as utils from './utils';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api/v1';

export const CALL_API = 'CALL_API';

export const apiMiddleware = store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  throw new Error('Setup Api First dummy');

  const { type, data, endpoint, method } = callAPI;

  console.log('api:', action);

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (typeof type !== 'string') {
    throw new Error('Specify a string type');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  next(actionWith({ type: `${type}_FETCH` }));

  const headers = {};
  const token =
    store.getState().token || utils.storageGet('token') || 'XXXbjksaldfjionTOKENWOWZERSXXX';
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  // return axios.get(API_BASE_URL + '/threads/').then(
  return axios({
    method,
    url: API_BASE_URL + endpoint,
    data,
    headers
  })
    .then(response => {
      next(
        actionWith({
          type: `${type}_SUCCESS`,
          data: response.data
        })
      );
      return Promise.resolve(response);
    })
    .catch(error => {
      next(
        actionWith({
          type: `${type}_FAILURE`,
          error: error.message || 'Error during api call'
        })
      );
    });

  // if (!api.isAuthed()) {
  //   const token = store.getState().token || utils.storageGet('token')
  //   api.auth(token)
  // }
  // return action.fn(store.dispatch, store.getState, api)
};
