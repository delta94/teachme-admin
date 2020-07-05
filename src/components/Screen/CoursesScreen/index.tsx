import React, { ReactElement } from 'react';

import { coursesMockData } from '../../../constants/mocks/courses-mock';
import courseCompletionChartMock from '../../../constants/mocks/courseCompletionChartMock';
import courseCompletionRateChartMock from '../../../constants/mocks/courseCompletionRateChartMock';
import { data as tableData, columns } from '../../../constants/mocks/tableMockCoursesData';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import AnalyticsCharts from '../../common/AnalyticsCharts';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, analytics, CoursesTable } = coursesMockData;

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <AnalyticsCharts
        data={analytics}
        courseTimeCompletionData={courseCompletionChartMock}
        quizCompletionRateData={courseCompletionRateChartMock}
      />
      <WMCard
        title={`${tableData.length} ${CoursesTable.title}`}
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        <WMTable data={tableData} columns={columns} />
      </WMCard>
    </>
  );
}
