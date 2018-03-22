import { actionTypes } from "../actions/authActions";
import * as utils from "../lib/utils";

const defaultToken = utils.storageGet("token");

export const token = (state = defaultToken, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      console.log("setting token");
      return action.token;
    default:
      return state;
  }
};

export default function auth(state = {}, action) {
  switch (action.type) {
    case `${actionTypes.LOGIN}_FETCH`:
      return state;
    case `${actionTypes.LOGIN}_SUCCESS`:
      return state;
    case `${actionTypes.LOGIN}_FAILURE`:
      return state;
    case `${actionTypes.LOGOUT}_FETCH`:
      return state;
    case `${actionTypes.LOGOUT}_SUCCESS`:
      return state;
    case `${actionTypes.LOGOUT}_FAILURE`:
      return state;
    default:
      return state;
  }
}
