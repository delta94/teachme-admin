import React, { ReactElement } from 'react';
import cc from 'classcat';

import { useCourseEditorContext } from '../../../providers/CourseEditorContext';

import WMCard from '../../common/WMCard';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';

import CourseOutlineTab from './CourseOutlineTab';
import classes from './style.module.scss';
import CourseSettingsTab from './CourseSettingsTab';
import ActionMenu from './ActionMenu';

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseOutline(): ReactElement {
  const [state] = useCourseEditorContext();
  const { isDetailsPanelOpen } = state;

  const tabs = [
    {
      id: TabId.CourseOutline,
      title: 'Course Outline',
      content: <CourseOutlineTab />,
    },
    {
      id: TabId.Settings,
      title: 'Settings',
      content: <CourseSettingsTab />,
    },
  ];

  return (
    <>
      <WMCard className={classes['course-structure']}>
        <WMTabs className={classes['tabs']} defaultActiveKey={TabId.CourseOutline}>
          {tabs.map(({ id, title, content }) => (
            <WMTabPanel tab={title} key={id}>
              {content}
            </WMTabPanel>
          ))}
        </WMTabs>
      </WMCard>
      <WMCard
        className={cc([classes['details-panel'], { [classes['open']]: isDetailsPanelOpen }])}
        title={<div className={classes['title']}>Some Details</div>}
      />
    </>
  );
}
