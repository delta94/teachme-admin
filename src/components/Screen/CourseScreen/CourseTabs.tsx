import React, { ReactElement, useEffect, useState } from 'react';

import { courseMockData } from '../../../constants/mocks/course-screen';
import { useAppContext } from '../../../providers/AppContext';

import WMTabs from '../../common/WMTabs';
import WMTabPanel from '../../common/WMTabs/WMTabPanel';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import CourseQuizTabCharts from '../../common/CourseQuizTabCharts';
import WMCard from '../../common/WMCard';
import WMSkeleton from '../../common/WMSkeleton';
import CourseOutlineTable from './CourseOutlineTable';
import { ICourseTabs } from './courseScreen.interface';

enum TabId {
  Outline = 'outline',
  Quiz = 'quiz',
}

export default function CourseTabs({ course }: ICourseTabs): ReactElement {
  const { courseOutlineTableData, quizData } = courseMockData;
  const courseTabs = [
    {
      id: TabId.Outline,
      title: 'Outline',
      itemsLength: 16,
      icon: <Icon type={IconType.SidebarCourses} />,
      content: <CourseOutlineTable course={courseOutlineTableData} />, // TODO: after integration replace mock data with prop course
    },
    {
      id: TabId.Quiz,
      title: 'Quiz',
      itemsLength: quizData.questions.length,
      icon: <Icon type={IconType.Quiz} />,
      content: <CourseQuizTabCharts data={quizData} />, // TODO: after integration replace mock data with prop course
    },
  ];

  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

  return (
    <WMCard>
      <WMTabs defaultActiveKey={TabId.Outline}>
        {courseTabs.map((tab) => {
          const { id, title, itemsLength, icon, content } = tab;

          return (
            <>
              {appInit ? (
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
              ) : (
                <WMSkeleton active paragraph={{ rows: 10 }} />
              )}
            </>
          );
        })}
      </WMTabs>
    </WMCard>
  );
}
