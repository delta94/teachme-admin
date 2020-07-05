import React, { ReactElement, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { RouteComponentProps, Link } from 'react-router-dom';

import { COURSES_ROUTE } from '../../../constants/routes';
import { courseMockData } from '../../../constants/mocks/course-screen';
import { data as courses, labelColors } from '../../../constants/mocks/tableMockCoursesData';

import ScreenHeader from '../../common/ScreenHeader';
import WMCard from '../../common/WMCard';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import courseCompletionChartMock from '../../../constants/mocks/courseCompletionChartMock';
import courseCompletionRateChartMock from '../../../constants/mocks/courseCompletionRateChartMock';

import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import WMTag from '../../common/WMTag';
import WMButton from '../../common/WMButton';

import classes from './style.module.scss';

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
        <ScreenHeader
          className={classes['course-details-header']}
          title={
            <div className={classes['course-details-title-section']}>
              <Icon className={classes['course-details-icon']} type={IconType.SidebarCourses} />
              <span className={classes['course-name']}>{course.name.value}</span>
              <WMTag value={course.productionStatus} color={labelColors[course.productionStatus]} />
              <WMButton type="default" shape="round" className={classes.edit}>
                <Link to="/new-course">Edit</Link>
              </WMButton>
              <div className={classes['course-details-sub-title']}>
                <span>
                  This course is available to: <b>HR</b>
                </span>
              </div>
            </div>
          }
          breadcrumbs={
            <Breadcrumb className={classes['course-details-breadcrumbs']}>
              <Breadcrumb.Item>
                <Link to={COURSES_ROUTE.path}>{COURSES_ROUTE.title}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{course.name.value}</Breadcrumb.Item>
            </Breadcrumb>
          }
        />
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
