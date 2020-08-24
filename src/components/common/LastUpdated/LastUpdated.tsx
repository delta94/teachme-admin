import React, { ReactElement, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import cc from 'classcat';

import { DataEvents } from '../../../walkme/screens/general';
import { AnalyticsEvents } from '../../../walkme/models/analytics';

import classes from './style.module.scss';

export default function LastUpdated({ className }: { className?: string }): ReactElement {
  const [lastUpdateTime, setLastUpdateTime] = useState<Moment | null>(null);

  const updateTime = ({ last_update_time }: { last_update_time: Date }) => {
    setLastUpdateTime(moment(last_update_time));
  };

  useEffect(() => {
    DataEvents.on(AnalyticsEvents.DATA_UPDATE_CHANGED, updateTime);

    return () => {
      DataEvents.off(AnalyticsEvents.DATA_UPDATE_CHANGED, updateTime);
    };
  }, []);

  const hasValidDate = lastUpdateTime?.isValid();
  return hasValidDate ? (
    <div className={cc([classes['last-updated'], className])}>
      Last data update at {moment(lastUpdateTime).format('hh:mm')}
    </div>
  ) : (
    <></>
  );
}
