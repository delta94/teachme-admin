import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, fetchCourseData, ActionType } from '../../../providers/CourseContext';
import { courseMockData } from '../../../constants/mocks/course-screen';
import { data as courses } from '../../../constants/mocks/tableMockCoursesData';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import CourseScreenHeader from './CourseScreenHeader';
import CourseTabs from './CourseTabs';

export const getCourseById = ({ courses, id }: { courses: any[]; id: string }): any =>
  courses.find((course) => course.key === id);

export default function CourseScreen(): ReactElement {
  const [{ environment, system }, appDispatch] = useAppContext();
  const [state, dispatch] = useCourseContext();
  const {
    dateRange: { from, to },
    overview,
    // course,
  } = state;

  const { courseId } = useParams();
  const [course, setCourse] = useState(null as any);

  // useEffect(() => {
  //   const envId = environment?.id ?? 0;
  //   fetchCourseData(dispatch, courseId, envId, from, to);
  // }, [dispatch, courseId, environment, system, from, to]);

  // // Unmount only
  // useEffect(() => () => dispatch({ type: ActionType.ResetCourse }), [dispatch]);

  useEffect(() => {
    setCourse(null);

    /**
     * timer - used for fake async
     * TODO: replace it with async request when the SDK ready.
     */
    const timer = setTimeout(() => {
      const selectedCourse = getCourseById({
        courses,
        id: courseId,
      });

      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [courseId]);

  return (
    course && (
      <>
        <CourseScreenHeader course={course} />
        <AnalyticsCharts
          summaryChartTitle="Users Started / Completed Course"
          quizData={courseMockData.analytics.quizData}
        />
        <CourseTabs course={course} />
      </>
    )
  );
}
