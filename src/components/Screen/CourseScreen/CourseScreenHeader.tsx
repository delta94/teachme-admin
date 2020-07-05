import React, { ReactElement } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { COURSES_ROUTE } from '../../../constants/routes';
import { labelColors } from '../../../constants/mocks/tableMockCoursesData';

import ScreenHeader from '../../common/ScreenHeader';

import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import WMTag from '../../common/WMTag';
import WMButton from '../../common/WMButton';

import classes from './style.module.scss';

export default function CourseScreenHeader({ course }: { course: any }): ReactElement {
  return (
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
  );
}
