import React, { ReactElement, useEffect, useState } from 'react';
import cc from 'classcat';

import { courseMockData } from '../../../constants/mocks/course-screen';
import { data as courses } from '../../../constants/mocks/tableMockCoursesData';

import ScreenHeader from '../../common/ScreenHeader';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';

import classes from './style.module.scss';
import { RouteComponentProps } from 'react-router-dom';
import CourseStatusChart from '../../common/CourseStatusChart';
import CoursesTimeCompletionChart from '../../common/CourseTimeCompletionChart';
import QuizCompletionRateChart from '../../common/QuizCompletionRateChart';

type TParams = { courseId: string };

export const getCourseById = ({ courses, id }: { courses: any[]; id: string }): any =>
  courses.find((course) => course.key === id);

export default function CourseScreen({ match }: RouteComponentProps<TParams>): ReactElement {
  const { courseId } = match.params;
  const [course, setCourse] = useState(null as any);

  const {
    title: mainTitle,
    analytics: { graph_1, graph_2, graph_3 },
    CoursesTable,
  } = courseMockData;

  useEffect(() => {
    setCourse(null);

    // Using setTimeout for set fadeInUp animation
    const timer = setTimeout(() => {
      const selectedCourse = getCourseById({
        courses,
        id: match.params.courseId,
      });

      console.log('selectedCourse ', selectedCourse);

      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [courseId]);

  return (
    course && (
      <>
        <ScreenHeader title={course.name.value} />
        <div className={classes.analytics}>
          <div className={cc([classes.graphs, classes['left-graphs']])}>
            <CourseStatusChart title={graph_1.title} />
          </div>
          <div className={cc([classes.graphs, classes['right-graphs']])}>
            <WMCard title={graph_2.title}>
              <CoursesTimeCompletionChart />
            </WMCard>
            <WMCard title={graph_3.title}>
              <QuizCompletionRateChart />
            </WMCard>
          </div>
        </div>

        <WMCard subTitle="Courses will appear to your users in the order below."></WMCard>
      </>
    )
  );
}
