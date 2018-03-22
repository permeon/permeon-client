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
 * @param id the key to use for the id of each entity
 */
export function transformPayload(payload, id = "_id") {
  const entities = {};
  if (Array.isArray(payload)) {
    payload.forEach(entity => {
      entities[entity[id]] = entity;
    });
  } else if (typeof payload === "object") {
    entities[payload[id]] = payload;
  } else {
    throw new Error("Payload must either be an array or an object.");
  }
  return entities;
}
