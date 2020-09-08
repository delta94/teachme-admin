import { EventEmitter } from 'events';

import * as endpoint from './endpoint';

import { AnalyticsEvents } from '../../models/analytics';
import { getLastUpdateTime } from './lastUpdate';

export const DataEvents = new EventEmitter();
let _systemId = -1;

export const get = async (path: string): Promise<any> => {
  const lastUpdate = getLastUpdateTime();
  const responseBody = await endpoint.get(
    `${path}&last_update=${lastUpdate}&systemId=${_systemId}`,
  );

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

export function setSystemId(id: number) {
  _systemId = id;
}
