import React, { ReactElement } from 'react';

import { quizBarChartMock } from '../../../constants/mocks/quizBarChart-mock';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import CourseQuizTabCharts from '../../common/CourseQuizTabCharts';
import CourseOutlineTable from './CourseOutlineTable';
import WMCard from '../../common/WMCard';
import { ICourseTabs } from './courseScreen.interface';

enum TabId {
  Outline = 'outline',
  Quiz = 'quiz',
}

export default function CourseTabs({ course }: ICourseTabs): ReactElement {
  const courseTabs = [
    {
      id: TabId.Outline,
      title: 'Outline',
      itemsLength: 16,
      icon: <Icon type={IconType.SidebarCourses} />,
      content: <CourseOutlineTable course={quizBarChartMock} />, // TODO: after integration replace mock data with prop course
    },
    {
      id: TabId.Quiz,
      title: 'Quiz',
      itemsLength: quizBarChartMock.questions.length,
      icon: <Icon type={IconType.Quiz} />,
      content: <CourseQuizTabCharts data={quizBarChartMock} />, // TODO: after integration replace mock data with prop course
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
                    {title} {itemsLength && `(${itemsLength})`}
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
