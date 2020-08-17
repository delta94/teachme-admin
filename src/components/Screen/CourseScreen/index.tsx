import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IDateRange } from '../../../utils';
import { useRedirectToMain } from '../../../hooks';
import { useAppContext, ActionType as AppActionType } from '../../../providers/AppContext';
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
  ICourseOutline,
} from './courseScreen.interface';

export { parseCourseOutline };
export type { ICourseOutlineItem, ICourseOutlineLesson, ICourseOutlineItems, ICourseOutline };

// TODO: add cleanups to fetchCourseData
export default function CourseScreen(): ReactElement {
  const [appState, appDispatch] = useAppContext();
  const {
    isUpdating,
    environment: { id: envId },
    dateRange: { from, to },
  } = appState;
  const [state, dispatch] = useCourseContext();
  const { isFetchingCourseData, overview, courseMetadata } = state;
  const { courseId } = useParams();

  useEffect(() => {
    if (!isUpdating) fetchCourseData(dispatch, courseId, envId, from, to);
  }, [dispatch, isUpdating, courseId, envId, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourse }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    appDispatch({ type: AppActionType.SetDateRange, dateRange });

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
