import uuidv4 from 'uuid/v4';
const APP_VERSION = '0.1';
const APP_NAME = 'myapp';

export function getAppJsonMetadata() {
  return `${APP_NAME}/${APP_VERSION}`;
}

export function generatePermlink() {
  return uuidv4();
}
