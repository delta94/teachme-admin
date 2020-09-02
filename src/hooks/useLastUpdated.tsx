import { useCallback, useEffect } from 'react';

import { ActionType, IDispatch } from '../providers/AppContext';
import { DataEvents } from '../walkme/screens';
import { AnalyticsEvents } from '../walkme/models/analytics';

export default function useLastUpdated(dispatch: IDispatch): void {
  const updateTime = useCallback(
    ({ last_update_time: lastUpdateTime }: { last_update_time: Date }) => {
      dispatch({ type: ActionType.UpdateLastUpdated, lastUpdateTime });
    },
    [dispatch],
  );

  useEffect(() => {
    DataEvents.on(AnalyticsEvents.DATA_UPDATE_CHANGED, updateTime);

    return () => {
      DataEvents.off(AnalyticsEvents.DATA_UPDATE_CHANGED, updateTime);
    };
  }, [updateTime]);
}
