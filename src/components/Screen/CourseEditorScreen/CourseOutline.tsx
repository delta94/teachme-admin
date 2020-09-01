import React, { Dispatch, ReactElement, useCallback, useMemo } from 'react';
import cc from 'classcat';

import WMCard from '../../common/WMCard';
import WMTabs, { WMTabPanel } from '../../common/WMTabs';

import { ActionType } from '../../../providers/CourseEditorContext';
import { Course } from '../../../walkme/data/courseBuild/course';
import { ActiveDetailsItem } from '../../../providers/CourseEditorContext/course-editor-context.interface';
import { Quiz } from '../../../walkme/data/courseBuild/quiz';
import CourseOutlineTab from './CourseOutlineTab';
import CourseSettingsTab from './CourseSettingsTab';
import CourseOutlineDetailsPanel from './CourseOutlineDetailsPanel';

import classes from './style.module.scss';

enum TabId {
  CourseOutline = 'course-outline',
  Settings = 'settings',
}

export default function CourseOutline({
  isDetailsPanelOpen,
  course,
  activeDetailsItem,
  isFetchingCourse,
  quiz,
  isUpdating,
  envId,
  dispatch,
}: {
  isDetailsPanelOpen: boolean;
  course: Course | null;
  activeDetailsItem: ActiveDetailsItem | null;
  isFetchingCourse: boolean;
  quiz: Quiz | null;
  isUpdating: boolean;
  envId: number;
  dispatch: Dispatch<any>;
}): ReactElement {
  const closeDetailsPanel = useCallback(() => {
    dispatch({ type: ActionType.CloseDetailsPanel });
  }, [dispatch]);

  const tabs = useMemo(
    () => [
      {
        id: TabId.CourseOutline,
        title: 'Course Outline',
        component: CourseOutlineTab,
      },
      {
        id: TabId.Settings,
        title: 'Settings',
        component: CourseSettingsTab,
        onClick: closeDetailsPanel,
      },
    ],
    [closeDetailsPanel],
  );

  const onTabClick = useCallback(
    (key: string) => {
      const tabItem = tabs.find((tab) => tab.id === key);
      if (tabItem && tabItem.onClick) {
        tabItem.onClick();
      }
    },
    [tabs],
  );

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
          {tabs.map(({ id, title, component: Component }) => (
            <WMTabPanel tab={title} key={id}>
              <Component
                course={course}
                isFetchingCourse={isFetchingCourse}
                envId={envId}
                quiz={quiz}
                isUpdating={isUpdating}
                activeDetailsItem={activeDetailsItem}
                isDetailsPanelOpen={isDetailsPanelOpen}
                dispatch={dispatch}
              />
            </WMTabPanel>
          ))}
        </WMTabs>
      </WMCard>
      <CourseOutlineDetailsPanel
        course={course}
        quiz={quiz}
        isDetailsPanelOpen={isDetailsPanelOpen}
        activeDetailsItem={activeDetailsItem}
        dispatch={dispatch}
      />
    </>
  );
}
