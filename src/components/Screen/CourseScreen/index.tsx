import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { courseMockData } from '../../../constants/mocks/course-screen';
import { data as courses } from '../../../constants/mocks/tableMockCoursesData';
import courseCompletionChartMock from '../../../constants/mocks/courseCompletionChartMock';
import courseCompletionRateChartMock from '../../../constants/mocks/courseCompletionRateChartMock';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import CourseScreenHeader from './CourseScreenHeader';
import CourseTabs from './CourseTabs';

export const getCourseById = ({ courses, id }: { courses: any[]; id: string }): any =>
  courses.find((course) => course.key === id);

export default function CourseScreen(): ReactElement {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null as any);

  const { analytics } = courseMockData;

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
          data={analytics}
          courseTimeCompletionData={courseCompletionChartMock}
          quizCompletionRateData={courseCompletionRateChartMock}
        />
        <CourseTabs course={course} />
      </>
    )
  );
}
