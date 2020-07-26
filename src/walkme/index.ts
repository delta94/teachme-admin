import walkme from '@walkme/editor-sdk';
import * as screens from './screens';
export * from './screens';
declare global {
  interface Window {
    walkme: any;
    test: any;
  }
}
// For debug purposes
window.walkme = walkme;
window.test = {
  ...screens,
};

export function getRedirectURI(): string {
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

export async function authInit(params: {
  client_id: any;
  redirect_uri: any;
  post_logout_redirect_uri: any;
}): Promise<void> {
  walkme.auth.onTokenExpired(() => {
    console.log('Token expired - redirecting to login');
    walkme.auth.init(params);
  });
  await walkme.auth.init(params);
}
