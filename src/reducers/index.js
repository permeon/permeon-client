import { combineReducers } from "redux";

import auth, { token } from "./auth";
import user from "./user";

const geoApp = combineReducers({
  auth,
  token,
  user
});

export default geoApp;
