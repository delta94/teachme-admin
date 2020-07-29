import React, { ReactElement } from 'react';

import WMCard from '../../common/WMCard';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';

import CourseOutlineTab from './CourseOutlineTab';
import classes from './style.module.scss';
import CourseSettingsTab from './CourseSettingsTab';
import CourseOutlineDetailsPanel from './CourseOutlineDetailsPanel/CourseOutlineDetailsPanel';

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseOutline(): ReactElement {
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
      <CourseOutlineDetailsPanel />
    </>
  );
}
