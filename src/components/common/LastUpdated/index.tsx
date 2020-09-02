import React, { ReactElement } from 'react';
import moment, { Moment } from 'moment';
import cc from 'classcat';

import { useAppContext } from '../../../providers/AppContext';
import classes from './style.module.scss';

export default function LastUpdated({ className }: { className?: string }): ReactElement {
  const [{ lastUpdateTime }] = useAppContext();
  const lastUpdated: Moment = moment(lastUpdateTime);
  const hasValidDate = lastUpdated?.isValid();

  return (
    <>
      {hasValidDate && (
        <div className={cc([classes['last-updated'], className])}>
          Last data update at {lastUpdated.format('hh:mm')}
        </div>
      )}
    </>
  );
}
