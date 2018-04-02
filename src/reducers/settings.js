import { combineReducers } from 'redux';
import _ from 'lodash';

import { actionTypes } from '../actions/settingsActions';

const defaultSettings = {
  locale: 'en-us',
  nsfw: false
};

export default function settingsReducer(state = defaultSettings, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Selectors
export const all = state => state;
