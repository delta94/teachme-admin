import walkme from '@walkme/editor-sdk';

/**
 * Returns Data for logged-in user
 */
export async function getUserData() {
  return walkme.user.getUserData();
}

/**
 * Returns a list of the users environments
 */
export async function getEnvironments() {
  return walkme.environment.getEnvironments();
}

/**
 * Returns a list of the users system
 * @throws if the user has no system - use getSystem data to check if systems are available
 */
export async function getSystems() {
  return walkme.system.getSystems();
}

/**
 * Returns data on the current system
 * Returns an empty string if the user has no systems
 */
export async function getSystemData() {
  return walkme.system.getSystemData();
}

/**
 * Changes context to the given system id
 * @param id the id of the requested system - use getSystems to get all possible values
 */
export async function switchSystem(id: number) {
  return walkme.system.switchSystem(id);
}

/**
 * Logs the user out and redirects to the url configured in walkme.auth.init call
 */
export function logout() {
  walkme.auth.logout();
}
