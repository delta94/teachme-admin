import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IDateRange } from '../../../utils';
import { useRedirectToMain } from '../../../hooks';
import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, fetchCourseData, ActionType } from '../../../providers/CourseContext';
import { CourseOverviewData } from '../../../walkme/models';

import AnalyticsCharts from '../../common/AnalyticsCharts';

import CourseScreenHeader from './CourseScreenHeader';
import CourseTabs from './CourseTabs';
import { parseCourseOutline } from './utils';
import {
  ICourseOutlineItem,
  ICourseOutlineLesson,
  ICourseOutlineItems,
} from './courseScreen.interface';

export { parseCourseOutline };
export type { ICourseOutlineItem, ICourseOutlineLesson, ICourseOutlineItems };

// TODO: add cleanups to fetchCourseData
export default function CourseScreen(): ReactElement {
  const [appState] = useAppContext();
  const {
    isUpdating,
    environment: { id: envId },
  } = appState;
  const [state, dispatch] = useCourseContext();
  const {
    isFetchingCourseData,
    dateRange: { from, to },
    overview,
    courseMetadata,
  } = state;
  const { courseId } = useParams();

  useEffect(() => {
    if (!isUpdating) fetchCourseData(dispatch, courseId, envId, from, to);
  }, [dispatch, isUpdating, courseId, envId, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourse }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    dispatch({ type: ActionType.SetDateRange, dateRange });

  useRedirectToMain();

  return (
    <>
      <CourseScreenHeader
        courseMetadata={courseMetadata}
        timeFilterProps={{ onDateRangeChange, dateRange: { from, to } }}
      />
      <AnalyticsCharts
        summaryChartTitle="Users Started / Completed Course"
        overview={overview as CourseOverviewData}
        isLoading={isUpdating || isFetchingCourseData}
      />
      <CourseTabs />
    </>
  );
}
