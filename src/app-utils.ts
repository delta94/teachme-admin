import walkme from '@walkme/editor-sdk';
import './walkme';

interface IAppStatus {
  isLoading: boolean;
  hasError: boolean;
}

function getRedirectURI(): string {
  switch (window.location.hostname) {
    case 'localhost':
      return 'http://localhost:7000/#&';
    case 'teachme.walkme.com':
      return 'http://teachme.walkme.com/#&';
    case 'cdn.walkme.com':
      return 'https://cdn.walkme.com/apps/teachme-admin/index.html#&';
    default:
      return window.location.href;
  }
}

export async function appInitiator(): Promise<IAppStatus> {
  const redirect_uri = getRedirectURI();

  const appStatus = {
    isLoading: true,
    hasError: false,
  };

  try {
    await walkme.auth.init({
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
