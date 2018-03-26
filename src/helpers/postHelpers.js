import uuidv4 from 'uuid/v4';
import config from "../config";

const { APP_NAME, APP_VERSION } = config.pick('APP_NAME', 'APP_VERSION');

export function getAppJsonMetadata() {
  return `${APP_NAME}/${APP_VERSION}`;
}

export function generatePermlink() {
  return uuidv4();
}
