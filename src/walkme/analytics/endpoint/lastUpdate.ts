import * as endpoint from './endpoint';

const TWO_HOURS_MILLISECONDS = 1000 * 60 * 60 * 2;

let _lastUpdate = new Date(0);

export function getLastUpdateTime(): number {
  fetchLastUpdateTime();
  return _lastUpdate.getTime();
}

async function fetchLastUpdateTime() {
  if (Date.now() - _lastUpdate.getTime() < TWO_HOURS_MILLISECONDS) return;

  const { last_update_time } = (await endpoint.get('management/lastUpdate')) as ILastUpdateResponse;
  _lastUpdate = new Date(last_update_time);
}

interface ILastUpdateResponse {
  last_update_time: string;
}
