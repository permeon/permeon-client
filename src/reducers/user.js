import { actionTypes } from "../actions/userActions";

export default (state = {}, action) => {
  switch (action.type) {
    case `${actionTypes.LOAD_USER}_FETCH`:
      return state;
    case `${actionTypes.LOAD_USER}_SUCCESS`:
      return state;
    case `${actionTypes.LOAD_USER}_FAILURE`:
      return state;
    default:
      return state;
  }
};
