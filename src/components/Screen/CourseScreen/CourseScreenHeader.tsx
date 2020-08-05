import React, { ReactElement } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { CourseMetadata } from '../../../walkme/data/courseMetadata';
import { COURSES_ROUTE, BASE_COURSE_EDITOR_ROUTE } from '../../../constants/routes';
import { getPublishStatusColor, getPublishStatusLabel } from '../../../utils/publish-status';

import { WMSkeletonInput, WMSkeletonButton, WMSkeletonAvatar } from '../../common/WMSkeleton';
import ScreenHeader, { IScreenHeader } from '../../common/ScreenHeader';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import WMTag from '../../common/WMTag';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import classes from './style.module.scss';

interface ICourseScreenHeader extends Omit<IScreenHeader, 'title'> {
  courseMetadata?: CourseMetadata;
}

export default function CourseScreenHeader({
  courseMetadata,
  ...otherProps
}: ICourseScreenHeader): ReactElement {
  const hasCourseData = courseMetadata && Object.keys(courseMetadata).length !== 0;

  return (
    <ScreenHeader
      className={classes['course-details-header']}
      isLoading={hasCourseData}
      title={
        <div className={classes['course-details-title-section']}>
          {hasCourseData ? (
            <>
              <Icon className={classes['course-details-icon']} type={IconType.SidebarCourses} />
              <span className={classes['course-name']}>{courseMetadata?.title}</span>
              {courseMetadata?.publishStatus !== undefined && (
                <WMTag
                  value={getPublishStatusLabel(courseMetadata.publishStatus)}
                  color={getPublishStatusColor(courseMetadata.publishStatus)}
                />
              )}
              <WMButton
                shape="round"
                variant={ButtonVariantEnum.Secondary}
                className={classes['edit']}
              >
                <Link to={`${BASE_COURSE_EDITOR_ROUTE.path}/${courseMetadata?.id}`}>Edit</Link>
              </WMButton>
              {Boolean(courseMetadata?.segments.length) && (
                <div className={classes['course-details-sub-title']}>
                  <span>
                    This course is available to: <b>{courseMetadata?.segments.join(' ,')}</b>
                  </span>
                </div>
              )}
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
          <Breadcrumb.Item>{courseMetadata?.title}</Breadcrumb.Item>
        </Breadcrumb>
      }
      {...otherProps}
    />
  );
}
