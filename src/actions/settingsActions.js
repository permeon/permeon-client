export const actionTypes = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
};

export function updateSettings(values) {
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_SETTINGS,
      payload: values
    });
    return Promise.resolve();
  };
}
