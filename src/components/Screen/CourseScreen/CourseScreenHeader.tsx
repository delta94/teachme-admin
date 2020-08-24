import React, { ReactElement } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import { CourseMetadata } from '../../../walkme/data/courseMetadata';
import { COURSES_ROUTE, BASE_COURSE_EDITOR_ROUTE } from '../../../constants/routes';
import { getPublishStatusColor, getPublishStatusLabel } from '../../../utils';

import { WMSkeletonInput, WMSkeletonButton, WMSkeletonAvatar } from '../../common/WMSkeleton';
import ScreenHeader, { IScreenHeader } from '../../common/ScreenHeader';
import Icon from '../../common/Icon';
import { IconType } from '../../common/Icon/icon.interface';
import LastUpdated from '../../common/LastUpdated/LastUpdated';
import WMTag from '../../common/WMTag';
import WMPopover from '../../common/WMPopover';
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
  const courseSegments = courseMetadata?.segments;

  const getSegments = (segments: string[]) => {
    const segmentsStr = segments.join(', ');
    const segmentsContent = (
      <span className={classes['segments-subtitle']}>
        This course is available to: <span className={classes['bold']}>{segmentsStr}</span>
      </span>
    );

    const popoverContent = <div className={classes['segments-popover-content']}>{segmentsStr}</div>;

    return <WMPopover content={popoverContent}>{segmentsContent}</WMPopover>;
  };

  return (
    <ScreenHeader
      className={classes['course-details-header']}
      isLoading={hasCourseData}
      title={
        <div className={classes['course-details-title-section']}>
          {hasCourseData ? (
            <>
              <div className={classes['course-details-title-left']}>
                <Icon className={classes['course-details-icon']} type={IconType.SidebarCourses} />
                <span className={classes['course-name']}>{courseMetadata?.title}</span>
                {courseMetadata?.publishStatus !== undefined && (
                  <WMTag
                    value={getPublishStatusLabel(courseMetadata.publishStatus)}
                    color={getPublishStatusColor(courseMetadata.publishStatus)}
                  />
                )}
                <LastUpdated />
              </div>
              <WMButton
                shape="round"
                variant={ButtonVariantEnum.Secondary}
                className={classes['edit']}
              >
                <Link to={`${BASE_COURSE_EDITOR_ROUTE.path}/${courseMetadata?.id}`}>Edit</Link>
              </WMButton>
            </>
          ) : (
            <>
              <WMSkeletonAvatar className={classes['course-details-icon']} active />
              <WMSkeletonInput className={classes['course-name']} active />
              <WMSkeletonButton active style={{ width: 50 }} />
              <WMSkeletonButton className={classes['edit']} active />
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
      subTitle={courseSegments && Boolean(courseSegments.length) && getSegments(courseSegments)}
      {...otherProps}
    />
  );
}
