import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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

import classes from './style.module.scss';

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
  const [{ isFetchingCourseData, overview, courseMetadata }, dispatch] = useCourseContext();
  const { courseId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!isUpdating) fetchCourseData(dispatch, courseId, envId, from, to, history);
  }, [dispatch, isUpdating, courseId, envId, from, to, history]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourse }), [dispatch]);

  const onDateRangeChange = useCallback(
    (dateRange?: IDateRange) => appDispatch({ type: AppActionType.SetDateRange, dateRange }),
    [appDispatch],
  );

  const timeFilterProps = useMemo(() => ({ onDateRangeChange, dateRange: { from, to } }), [
    onDateRangeChange,
    from,
    to,
  ]);

  useRedirectToMain();

  return (
    <div className={classes['course-screen']}>
      <CourseScreenHeader courseMetadata={courseMetadata} timeFilterProps={timeFilterProps} />
      <AnalyticsCharts
        summaryChartTitle="Users Started / Completed Course"
        overview={overview as CourseOverviewData}
        isLoading={isUpdating || isFetchingCourseData}
      />
      <CourseTabs />
    </div>
  );
}
