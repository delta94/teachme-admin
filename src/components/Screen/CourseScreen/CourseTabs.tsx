import React, { ReactElement } from 'react';

import { useCourseContext } from '../../../providers/CourseContext';
import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import CourseQuizTabCharts from '../../common/CourseQuizTabCharts';
import WMCard from '../../common/WMCard';
import CourseOutlineTable from './CourseOutlineTable';

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
      itemsLength: courseOutline.length,
      icon: <Icon type={IconType.SidebarCourses} />,
      content: <CourseOutlineTable />,
    },
    {
      id: TabId.Quiz,
      title: 'Quiz',
      itemsLength: quiz?.questions?.length ?? 0,
      icon: <Icon type={IconType.Quiz} />,
      isDisabled: !quiz || (quiz && Object.keys(quiz).length === 0),
      content: quiz && <CourseQuizTabCharts quiz={quiz} />,
    },
  ];

  return (
    <WMCard>
      <WMTabs defaultActiveKey={TabId.Outline}>
        {courseTabs.map((tab) => {
          const { id, title, itemsLength, icon, content, isDisabled } = tab;

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
              disabled={isDisabled}
            >
              {content}
            </WMTabPanel>
          );
        })}
      </WMTabs>
    </WMCard>
  );
}
