import React, { ReactElement } from 'react';

import WMCard from '../../common/WMCard';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';

import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import CourseOutlineTab from './CourseOutlineTab';
import classes from './style.module.scss';
import CourseSettingsTab from './CourseSettingsTab';
import CourseOutlineDetailsPanel from './CourseOutlineDetailsPanel/CourseOutlineDetailsPanel';

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseOutline(): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

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
        dispatch({
          type: ActionType.ToggleDetailsPanel,
          activeDetailsItem: null,
          openDetailsPanel: false,
        });
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
      <WMCard className={classes['course-structure']}>
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
