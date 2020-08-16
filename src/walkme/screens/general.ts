import walkme, { EmailList } from '@walkme/editor-sdk';
import * as wmData from '../data/services/wmData';

/**
 * Returns Data for logged-in user
 */
export async function getUserData() {
  return walkme.user.getUserData();
}

/**
 * Returns Data for originalUser
 */
export async function getOriginalUserData() {
  return walkme.user.getOriginalUserData();
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
  wmData.clear();
  return walkme.system.switchSystem(id);
}

/**
 * Impersonated the requested account
 * @param email requested account email to impersonate
 */
//TODO: Remove if function after PR
export async function impersonate(email: string): Promise<any> {
  return walkme.user.impersonate(email);
}

/**
 * Returns a list of emails that start with the given prefix
 * @param prefix the prefix of the requested emails
 */
//TODO: Remove if function after PR
export async function getEmails(prefix: string): Promise<EmailList> {
  return walkme.user.autoComplete(prefix);
}

/**
 * Logs the user out and redirects to the url configured in walkme.auth.init call
 */
export function logout() {
  walkme.auth.logout();
}
