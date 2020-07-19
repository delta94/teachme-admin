import * as walkme from '../walkme';

export interface IAppStatus {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export const defaultAppStatus = {
  isLoading: true,
  hasError: false,
  errorMessage: '',
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

    appStatus.isLoading = false;
  } catch (err) {
    console.log(err);
    appStatus.isLoading = false;
    appStatus.hasError = true;
    appStatus.errorMessage = err;
  }

  return appStatus;
}
