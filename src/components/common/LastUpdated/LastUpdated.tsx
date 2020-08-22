import React, { ReactElement, useEffect, useState } from 'react';
import moment from 'moment';

import { DataEvents } from '../../../walkme/screens/general';
import { AnalyticsEvents } from '../../../walkme/models/analytics';

export default function LastUpdated(): ReactElement {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  const updateTime = ({ last_update_time }: { last_update_time: Date }) => {
    setLastUpdateTime(last_update_time);
  };

  useEffect(() => {
    DataEvents.on(AnalyticsEvents.DATA_UPDATE_CHANGED, updateTime);

    return () => {
      DataEvents.off(AnalyticsEvents.DATA_UPDATE_CHANGED, updateTime);
    };
  }, []);

  return <div>Last data update at {moment(lastUpdateTime).format('hh:mm')}</div>;
}
