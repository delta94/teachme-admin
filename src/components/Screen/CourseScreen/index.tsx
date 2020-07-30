import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSkeleton } from '../../../hooks/skeleton';
import { IDateRange } from '../../../utils';
import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, fetchCourseData, ActionType } from '../../../providers/CourseContext';
import { courseMockData } from '../../../constants/mocks/course-screen';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import CourseScreenHeader from './CourseScreenHeader';
import CourseTabs from './CourseTabs';

export default function CourseScreen(): ReactElement {
  const appInit = useAppSkeleton();
  const [
    {
      environment: { id: envId },
      system,
    },
    appDispatch,
  ] = useAppContext();
  const [state, dispatch] = useCourseContext();
  const {
    dateRange: { from, to },
    overview,
    course,
  } = state;

  const { courseId } = useParams();

  useEffect(() => {
    if (!appInit) return;

    fetchCourseData(dispatch, courseId, envId, from, to);
  }, [dispatch, appInit, courseId, envId, system, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourse }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    dispatch({ type: ActionType.SetDateRange, dateRange });

  return (
    <>
      <CourseScreenHeader
        course={course}
        timeFilterProps={{ onDateRangeChange, dateRange: { from, to } }}
      />
      <AnalyticsCharts
        summaryChartTitle="Users Started / Completed Course"
        overview={overview}
        quizData={courseMockData.analytics.quizData}
      />
      <CourseTabs course={course} />
    </>
  );
}
