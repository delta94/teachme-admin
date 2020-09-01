import React, { ReactElement } from 'react';

import { useCourseContext } from '../../../providers/CourseContext';
import { useAppContext } from '../../../providers/AppContext';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import Icon, { IconType } from '../../common/Icon';
import WMCard from '../../common/WMCard';

import CourseQuizTabCharts from './CourseQuizTabCharts';
import CourseOutlineTable from './CourseOutlineTable';

import classes from './style.module.scss';

enum TabId {
  Outline = 'outline',
  Quiz = 'quiz',
}

export default function CourseTabs(): ReactElement {
  const [
    {
      isUpdating,
      environment: { id: envId },
      dateRange: { from, to },
    },
  ] = useAppContext();
  const [
    {
      quiz,
      courseOutline,
      isFetchingCourseData,
      filteredCourseOutline,
      courseOutlineSearchValue,
      courseMetadata,
      isExportingCourse,
    },
    dispatch,
  ] = useCourseContext();

  const courseTabs = [
    {
      id: TabId.Outline,
      title: 'Outline',
      itemsLength: courseOutline?.items?.length ?? 0,
      icon: <Icon type={IconType.SidebarCourses} />,
      content: (
        <CourseOutlineTable
          courseOutline={courseOutline}
          isFetchingCourseData={isFetchingCourseData}
          filteredCourseOutline={filteredCourseOutline}
          courseOutlineSearchValue={courseOutlineSearchValue}
          courseMetadata={courseMetadata}
          isExportingCourse={isExportingCourse}
          envId={envId}
          from={from}
          to={to}
          isUpdating={isUpdating}
          dispatch={dispatch}
        />
      ),
    },
    {
      id: TabId.Quiz,
      title: 'Quiz',
      itemsLength: quiz?.questions?.length ?? 0,
      icon: <Icon className={classes['quiz-tab-icon']} type={IconType.Quiz} />,
      content: quiz && <CourseQuizTabCharts quiz={quiz} />,
    },
  ];

  return (
    <WMCard>
      <WMTabs defaultActiveKey={TabId.Outline} className={classes['course-tabs']}>
        {courseTabs.map((tab) => {
          const { id, title, itemsLength, icon, content } = tab;

          return (
            <WMTabPanel
              tab={
                <>
                  {icon}
                  <span>
                    {title} {`(${itemsLength})`}
                  </span>
                </>
              }
              key={id}
            >
              {content}
            </WMTabPanel>
          );
        })}
      </WMTabs>
    </WMCard>
  );
}
