import React, { ReactElement, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { IDateRange, wmMessage, MessageType } from '../../../utils';
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
import { COURSES_ROUTE } from '../../../constants/routes';

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

  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollIntoView({ block: 'start' });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!isUpdating) await fetchCourseData(dispatch, courseId, envId, from, to);
      } catch (error) {
        wmMessage(error.message, MessageType.Error);
        history.replace(`${COURSES_ROUTE.path}`);
      }
    })();
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
