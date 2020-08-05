import React, { ReactElement, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import usePrevious from '@react-hook/previous';

import { IDateRange } from '../../../utils';
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
    system,
  } = appState;
  const [state, dispatch] = useCourseContext();
  const {
    isFetchingCourseData,
    dateRange: { from, to },
    overview,
    course,
    courseSegments,
  } = state;
  const { courseId } = useParams();

  useEffect(() => {
    if (!isUpdating) fetchCourseData(dispatch, courseId, envId, from, to);
  }, [dispatch, isUpdating, courseId, envId, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourse }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    dispatch({ type: ActionType.SetDateRange, dateRange });

  const prevSystem = usePrevious(system);
  const { push } = useHistory();

  useEffect(() => {
    if (prevSystem && prevSystem.userId !== system.userId) push('/courses');
  }, [prevSystem, system, push]);

  return (
    <>
      <CourseScreenHeader
        course={course}
        courseSegments={courseSegments}
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
