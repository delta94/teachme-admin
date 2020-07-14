import * as walkme from './walkme';

interface IAppStatus {
  isLoading: boolean;
  hasError: boolean;
}

export async function appInitiator(): Promise<IAppStatus> {
  const redirect_uri = walkme.getRedirectURI();

  const appStatus = {
    isLoading: true,
    hasError: false,
  };

  try {
    await walkme.authInit({
      client_id: '9df1e0b762fd4e87bb271fcd88124323',
      redirect_uri: redirect_uri,
      post_logout_redirect_uri: redirect_uri,
    });

    appStatus.isLoading = false;
  } catch (err) {
    console.log(err);
    appStatus.isLoading = false;
    appStatus.hasError = true;
  }

  return appStatus;
}
