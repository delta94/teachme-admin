import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { courseMockData } from '../../../constants/mocks/course-screen';
import { data as courses } from '../../../constants/mocks/tableMockCoursesData';
import courseCompletionChartMock from '../../../constants/mocks/courseCompletionChartMock';
import courseCompletionRateChartMock from '../../../constants/mocks/courseCompletionRateChartMock';

import WMCard from '../../common/WMCard';
import AnalyticsCharts from '../../common/AnalyticsCharts';
import CourseScreenHeader from './CourseScreenHeader';

type TParams = { courseId: string };

export const getCourseById = ({ courses, id }: { courses: any[]; id: string }): any =>
  courses.find((course) => course.key === id);

export default function CourseScreen({ match }: RouteComponentProps<TParams>): ReactElement {
  const { courseId } = match.params;
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
        <WMCard subTitle="Courses will appear to your users in the order below."></WMCard>
      </>
    )
  );
}
