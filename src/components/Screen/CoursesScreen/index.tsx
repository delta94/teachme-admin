import React, { ReactElement } from 'react';
import cc from 'classcat';

import { coursesMockData } from '../../../constants/mocks/courses-mock';
import courseCompletionChartMock from '../../../mocks/courseCompletionChartMock';
import courseCompletionRateChartMock from '../../../mocks/courseCompletionRateChartMock';
import { data as tableData, columns } from '../../../mocks/tableMockData';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import PieBarChart from '../../common/PieBarChart';
import AvgCompletionTimeLegend from '../../common/AvgCompletionTimeLegend';
import QuizCompletionRateLegend from '../../common/QuizCompletionRateLegend';
import PieBarSummary from '../../common/PieBarSummary';

import classes from './style.module.scss';

export default function CoursesScreen(): ReactElement {
  const {
    title: mainTitle,
    analytics: { graph_1, graph_2, graph_3 },
    CoursesTable,
  } = coursesMockData;

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <div className={classes.analytics}>
        <div className={cc([classes.graphs, classes['left-graphs']])}>
          <WMCard title={graph_1.title} />
        </div>
        <div className={cc([classes.graphs, classes['right-graphs']])}>
          <WMCard title={graph_2.title}>
            <PieBarSummary
              value={courseCompletionChartMock.summaryLegend}
              unit={` ${courseCompletionChartMock.summaryUnit}`}
            />
            <PieBarChart
              bars={courseCompletionChartMock.bars}
              totalValue={courseCompletionChartMock.totalValue}
              legendContent={AvgCompletionTimeLegend}
            />
          </WMCard>
          <WMCard title={graph_3.title}>
            <PieBarSummary
              value={courseCompletionRateChartMock.summaryLegend}
              unit={courseCompletionRateChartMock.summaryUnit}
              text={` (${courseCompletionRateChartMock.bars[0].value} of ${courseCompletionRateChartMock.totalValue} users)`}
            />
            <PieBarChart
              bars={courseCompletionRateChartMock.bars}
              totalValue={courseCompletionRateChartMock.totalValue}
              legendContent={QuizCompletionRateLegend}
            />
          </WMCard>
        </div>
      </div>
      <WMCard
        title={`${tableData.length} ${CoursesTable.title}`}
        subTitle="Courses will appear to your users in the order below."
      >
        <WMTable data={tableData} columns={columns} />
      </WMCard>
    </>
  );
}
