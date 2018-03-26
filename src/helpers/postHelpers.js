import uuidv4 from 'uuid/v4';
import { APP_NAME, APP_VERSION } from "../lib/constants";

export function getAppJsonMetadata() {
  return `${APP_NAME}/${APP_VERSION}`;
}

export function generatePermlink() {
  return uuidv4();
}
