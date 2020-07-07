import React, { ReactElement } from 'react';
import { message } from 'antd';

import WMCard from '../../common/WMCard';
import ScreenHeader from '../../common/ScreenHeader';
import RefreshButton from '../../common/buttons/RefreshButton';

import classes from './style.module.scss';

export default function CourseEditorScreen(): ReactElement {
  return (
    <>
      <ScreenHeader title="new-course" />
      <div className={classes['cards-wrapper']}>
        <WMCard
          className={classes['items']}
          title={
            <div className={classes['title']}>
              <span>Items</span>
              <RefreshButton onRefresh={() => message.info('Refreshing...')} />
            </div>
          }
        />
        <WMCard
          className={classes['course-outline']}
          title={<div className={classes['title']}>Course Outline</div>}
        />
      </div>
    </>
  );
}
