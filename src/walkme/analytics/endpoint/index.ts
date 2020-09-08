import { EventEmitter } from 'events';

import * as endpoint from './endpoint';

import { AnalyticsEvents } from '../../models/analytics';

export const DataEvents = new EventEmitter();

export const get = async (path: string): Promise<any> => {
  const responseBody = await endpoint.get(path);
  if (!responseBody.last_update_time) return responseBody as AnalyticsResponse;

  DataEvents.emit(AnalyticsEvents.DATA_UPDATE_CHANGED, {
    last_update_time: new Date(responseBody.last_update_time),
  });
  return responseBody.data;
};

export interface AnalyticsResponse {
  last_update_time?: string;
  data: any;
  error?: string;
}

export const { setSystemGuid } = endpoint;
