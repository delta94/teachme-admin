import React, { ReactElement } from 'react';

import { quizBarChartMock } from '../../../constants/mocks/quizBarChart-mock';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import CourseQuizTabCharts from '../../common/CourseQuizTabCharts';

import WMCard from '../../common/WMCard';

// import classes from './style.module.scss';

export default function CourseTabs({ course }: { course: any }): ReactElement {
  return (
    <WMCard>
      <WMTabs defaultActiveKey="outline">
        <WMTabPanel
          tab={
            <>
              <Icon type={IconType.SidebarCourses} />
              <span>Outline (16)</span>
            </>
          }
          key="outline"
        >
          Tab 1 content
        </WMTabPanel>
        <WMTabPanel
          tab={
            <>
              <Icon type={IconType.SidebarCourses} />
              <span>
                Quiz {quizBarChartMock.questions.length && `(${quizBarChartMock.questions.length})`}
              </span>
            </>
          }
          key="quiz"
        >
          <CourseQuizTabCharts data={quizBarChartMock} />
        </WMTabPanel>
      </WMTabs>
    </WMCard>
  );
}
