import walkme from '@walkme/editor-sdk';

const serviceDomain = 'https://api.walkme.com/teachmeservice';

export const get = async (path: string) => {
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

// import walkme from '@walkme/editor-sdk';
// import { EventEmitter } from 'events';
// import { AnalyticsEvents } from '../models/analytics';

// const serviceDomain = 'https://api.walkme.com/teachmeservice';
// export const DataEvents = new EventEmitter();

// export const get = async <T>(path: string): Promise<T> => {
//   const res = await fetch(`${serviceDomain}/${path}`, {
//     headers: {
//       authorization: walkme.auth.oidcAPI.getAuthorizationHeaderValue(),
//     },
//   });
//   const responseBody = (await getResponseBody(res)) as AnalyticsResponse<T>;
//   if (responseBody.error) {
//     throw new Error(`server error ${responseBody.error}`);
//   }
//   DataEvents.emit(AnalyticsEvents.DATA_UPDATE_CHANGED, {
//     last_update_time: responseBody.last_update_time,
//   });
//   return responseBody.data ?? responseBody;
// };

// async function getResponseBody<T>(res: Response): Promise<any> {
//   try {
//     return await res.clone().json();
//   } catch (e) {
//     console.log('response is not in json format');
//     return await res.clone().text();
//   }
// }

// export interface AnalyticsResponse<T> {
//   last_update_time: string;
//   data: T;
//   error?: string;
// }
