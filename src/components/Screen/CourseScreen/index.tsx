import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IDateRange } from '../../../utils';
import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, fetchCourseData, ActionType } from '../../../providers/CourseContext';
import { CourseOverviewData } from '../../../walkme/models';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import CourseScreenHeader from './CourseScreenHeader';
import CourseTabs from './CourseTabs';
import { parseCourseOutline } from './utils';
import { ICourseOutlineItem } from './courseScreen.interface';

export { parseCourseOutline };
export type { ICourseOutlineItem };

// TODO: add cleanups to fetchCourseData
export default function CourseScreen(): ReactElement {
  const [
    {
      isUpdating,
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
    courseOutline,
    quiz,
  } = state;

  const { courseId } = useParams();

  useEffect(() => {
    if (!isUpdating) fetchCourseData(dispatch, courseId, envId, from, to);
  }, [dispatch, isUpdating, courseId, envId, system, from, to]);

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
        overview={overview as CourseOverviewData}
        quizData={quiz}
      />
      <CourseTabs courseOutline={courseOutline} quiz={quiz} />
    </>
  );
}
