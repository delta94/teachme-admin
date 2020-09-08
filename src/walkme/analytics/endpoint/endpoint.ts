import walkme from '@walkme/editor-sdk';

const serviceDomain = 'https://api.walkme.com/teachmeservice';

export const get = async (path: string): Promise<any> => {
  const res = await fetch(`${serviceDomain}/${path}`, {
    headers: {
      authorization: walkme.auth.oidcAPI.getAuthorizationHeaderValue(),
    },
  });
  const responseBody = await getResponseBody(res);
  if (responseBody.error) {
    throw new Error(`server error ${responseBody.error}`);
  }

  return responseBody;
};

async function getResponseBody(res: Response): Promise<any> {
  try {
    return await res.clone().json();
  } catch (e) {
    console.log('response is not in json format');
    return await res.clone().text();
  }
}

