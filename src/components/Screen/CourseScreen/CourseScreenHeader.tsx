import React, { ReactElement } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { Course } from '../../../walkme/data/courseBuild';
import { COURSES_ROUTE, BASE_COURSE_EDITOR_ROUTE } from '../../../constants/routes';
import { labelColors } from '../../../constants/mocks/tableMockCoursesData';

import { WMSkeletonInput, WMSkeletonButton, WMSkeletonAvatar } from '../../common/WMSkeleton';
import ScreenHeader, { IScreenHeader } from '../../common/ScreenHeader';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import WMTag from '../../common/WMTag';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import classes from './style.module.scss';

interface ICourseScreenHeader extends Omit<IScreenHeader, 'title'> {
  course: Course;
}

export default function CourseScreenHeader({
  course,
  ...otherProps
}: ICourseScreenHeader): ReactElement {
  const hasCourseData = Object.keys(course).length !== 0;

  return (
    <ScreenHeader
      className={classes['course-details-header']}
      isLoading={hasCourseData}
      title={
        <div className={classes['course-details-title-section']}>
          {hasCourseData ? (
            <>
              <Icon className={classes['course-details-icon']} type={IconType.SidebarCourses} />
              <span className={classes['course-name']}>{course.title}</span>
              {/* TODO: Change to PublishStatus from SDK - missing data in Course */}
              <WMTag value={'draft'} color={labelColors[0]} />
              <WMButton
                shape="round"
                variant={ButtonVariantEnum.Secondary}
                className={classes['edit']}
              >
                <Link to={`${BASE_COURSE_EDITOR_ROUTE.path}/${course.id}`}>Edit</Link>
              </WMButton>
              <div className={classes['course-details-sub-title']}>
                <span>
                  This course is available to: <b>HR</b>
                </span>
              </div>
            </>
          ) : (
            <>
              <WMSkeletonAvatar className={classes['course-details-icon']} active />
              <WMSkeletonInput className={classes['course-name']} active />
              <WMSkeletonButton active style={{ width: 50 }} />
              <WMSkeletonButton className={classes['edit']} active />
              <WMSkeletonInput className={classes['course-details-sub-title']} active />
            </>
          )}
        </div>
      }
      breadcrumbs={
        <Breadcrumb className={classes['course-details-breadcrumbs']}>
          <Breadcrumb.Item>
            <Link to={COURSES_ROUTE.path}>{COURSES_ROUTE.title}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{course.title}</Breadcrumb.Item>
        </Breadcrumb>
      }
      {...otherProps}
    />
  );
}
