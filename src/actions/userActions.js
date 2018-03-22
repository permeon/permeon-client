import { CALL_API } from "../lib/apiMiddleware";

export const actionTypes = {
  LOAD_USER: "LOAD_USER"
};

export function loadUser() {
  return {
    [CALL_API]: {
      type: actionTypes.LOAD_USER,
      endpoint: `/me`,
      method: "GET"
    }
  };
}
