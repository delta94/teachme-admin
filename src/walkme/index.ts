import walkme from '@walkme/editor-sdk';
import * as screens from './screens';
export * from './screens';
declare global {
  interface Window {
    walkme: any;
    test: any;
    _walkmeConfig: any;
    walkmeData: any;
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
      return 'https://teachme.walkme.com/#&';
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
    walkme.auth.logout();
  });
  await walkme.auth.init(params);
}

export async function initWalkme() {
  if (!walkme.auth.isLoggedIn()) return;

  const userData = await walkme.user.getOriginalUserData();
  window.walkmeData = { account: userData.editorAccountName, user: userData.userName };
  loadWalkme();
}

function loadWalkme() {
  const walkme = document.createElement('script');
  walkme.type = 'text/javascript';
  walkme.async = true;
  walkme.src =
    'https://cdn.walkme.com/users/c74ffc2342d64f159535bb49632fbc58/walkme_c74ffc2342d64f159535bb49632fbc58_https.js';
  const s = document.getElementsByTagName('script')[0];
  //@ts-ignore
  s.parentNode.insertBefore(walkme, s);
  window._walkmeConfig = { smartLoad: true };
}
