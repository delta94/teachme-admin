import React, { ReactElement } from 'react';

import { useCourseContext } from '../../../providers/CourseContext';
import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import WMCard from '../../common/WMCard';

import CourseQuizTabCharts from './CourseQuizTabCharts';
import CourseOutlineTable from './CourseOutlineTable';

import classes from './style.module.scss';

enum TabId {
  Outline = 'outline',
  Quiz = 'quiz',
}

export default function CourseTabs(): ReactElement {
  const [{ quiz, courseOutline }] = useCourseContext();

  const courseTabs = [
    {
      id: TabId.Outline,
      title: 'Outline',
      itemsLength: courseOutline?.items?.length ?? 0,
      icon: <Icon type={IconType.SidebarCourses} />,
      content: <CourseOutlineTable />,
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
      <WMTabs defaultActiveKey={TabId.Outline}>
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
