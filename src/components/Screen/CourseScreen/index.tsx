import React, { ReactElement, useEffect, useRef } from 'react';
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
} from './courseScreen.interface';

import classes from './style.module.scss';

export { parseCourseOutline };
export type { ICourseOutlineItem, ICourseOutlineLesson, ICourseOutlineItems };

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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollIntoView({ block: 'start', inline: 'end' });
  }, []);

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
      <div ref={containerRef} className={classes['container-ref']} />
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
