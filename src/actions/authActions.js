import { CALL_API } from "../lib/apiMiddleware";
import * as utils from "../lib/utils";

export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};

export function setToken(token) {
  utils.storagePut("token", token);
  return {
    type: actionTypes.SET_TOKEN,
    token: token
  };
}

export function login(username, password) {
  return {
    [CALL_API]: {
      type: actionTypes.LOGIN,
      endpoint: `/auth/login`,
      method: "POST",
      data: {
        username,
        password
      }
    }
  };
}

export function logout() {
  return {
    [CALL_API]: {
      type: actionTypes.LOGOUT,
      endpoint: `/auth/logout`,
      method: "POST"
    }
  };
}
