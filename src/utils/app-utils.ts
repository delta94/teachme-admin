import { WalkMeEnvironment } from '@walkme/editor-sdk/dist/environment';
import { UserData } from '@walkme/editor-sdk/dist/user';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import * as walkme from '../walkme';

export interface IAppStatus {
  isLoading: boolean;
  hasError: boolean;
  errorMsg: string;
  globals: IAppGlobals;
}

export interface IAppGlobals {
  user: UserData;
  system: SystemData;
  environment: WalkMeEnvironment;
  hasError: boolean;
  errorMsg: string;
}

export const defaultAppStatus = {
  isLoading: true,
  hasError: false,
  errorMsg: '',
  globals: (null as unknown) as IAppGlobals,
};

export const defaultAppGlobals = {
  user: (null as unknown) as UserData,
  system: (null as unknown) as SystemData,
  environment: (null as unknown) as WalkMeEnvironment,
  hasError: false,
  errorMsg: '',
};

export async function appInitiator(): Promise<IAppStatus> {
  const redirect_uri = walkme.getRedirectURI();
  const appStatus = { ...defaultAppStatus };

  try {
    await walkme.authInit({
      client_id: '9df1e0b762fd4e87bb271fcd88124323',
      post_logout_redirect_uri: redirect_uri,
      redirect_uri,
    });
    const globals = await getAppGlobals();

    appStatus.globals = globals;
    appStatus.isLoading = false;
  } catch (err) {
    console.log(err);
    appStatus.isLoading = false;
    appStatus.hasError = true;
    appStatus.errorMsg = err;
  }

  return { ...appStatus };
}

export async function getAppGlobals(): Promise<IAppGlobals> {
  const globals = { ...defaultAppGlobals };

  try {
    const user = await walkme.getUserData();
    const system = await walkme.getSystem();
    const environments = await walkme.getEnvironments();

    globals.user = user;
    globals.system = system;
    globals.environment = environments[0];
    globals.hasError = false;
  } catch (err) {
    console.log(err);
    globals.hasError = true;
    globals.errorMsg = err;
  }

  return globals;
}
