import _ from 'lodash';

export function storagePut(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function storageGet(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

/**
 * Transforms server errors into formik format.
 * @param errors object where keys represent the field
 */
export function transformErrors(errors) {
  const formattedErrors = {};
  for (let key in errors) {
    const error = errors[key];
    formattedErrors[key] = error.message ? error.message : error;
  }
  return formattedErrors;
}

/**
 * Transforms the payload received from and api into a object.
 * Where keys are the ids mapping to each entity
 * @param payload
 * @param idPath the key to use for the id of each entity
 */
export function transformPayload(payload, idPath = 'id') {
  const entities = {};
  if (Array.isArray(payload)) {
    payload.forEach(entity => {
      entities[_.get(entity, idPath)] = entity;
    });
  } else if (typeof payload === 'object') {
    entities[_.get(payload, idPath)] = payload;
  } else {
    throw new Error('Payload must either be an array or an object.');
  }
  return entities;
}

export function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}
