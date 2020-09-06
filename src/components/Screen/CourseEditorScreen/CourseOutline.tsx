import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMCard from '../../common/WMCard';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';

import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import CourseOutlineTab from './CourseOutlineTab';
import CourseSettingsTab from './CourseSettingsTab';
import CourseOutlineDetailsPanel from './CourseOutlineDetailsPanel';

import classes from './style.module.scss';

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseOutline(): ReactElement {
  const [{ isDetailsPanelOpen }, dispatch] = useCourseEditorContext();

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
      onClick: () => {
        dispatch({ type: ActionType.CloseDetailsPanel });
      },
    },
  ];

  const onTabClick = (key: string) => {
    const tabItem = tabs.find((tab) => tab.id === key);
    if (tabItem && tabItem.onClick) {
      tabItem.onClick();
    }
  };

  return (
    <>
      <WMCard
        className={cc([
          classes['course-structure'],
          { [classes['details-panel-is-open']]: isDetailsPanelOpen },
        ])}
      >
        <WMTabs
          className={classes['tabs']}
          defaultActiveKey={TabId.CourseOutline}
          onTabClick={onTabClick}
        >
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
