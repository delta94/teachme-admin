import React, { ReactElement, useCallback, useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { CourseMetadata } from '../../../walkme/models/course';
import { COURSES_ROUTE, BASE_COURSE_EDITOR_ROUTE } from '../../../constants/routes';
import { getPublishStatusColor, getPublishStatusLabel } from '../../../utils';

import { WMSkeletonInput, WMSkeletonButton, WMSkeletonAvatar } from '../../common/WMSkeleton';
import ScreenHeader, { IScreenHeader } from '../../common/ScreenHeader';
import Icon, { IconType } from '../../common/Icon';
import LastUpdated from '../../common/LastUpdated/LastUpdated';

import WMTag from '../../common/WMTag';
import WMPopover from '../../common/WMPopover';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import classes from './style.module.scss';

interface ICourseScreenHeader extends Omit<IScreenHeader, 'title'> {
  courseMetadata?: CourseMetadata;
}

function CourseScreenHeader({ courseMetadata, ...otherProps }: ICourseScreenHeader): ReactElement {
  const hasCourseData = !isEmpty(courseMetadata);
  const courseSegments = courseMetadata?.segments;

  const getSegments = useCallback((segments: string[]) => {
    const segmentsStr = segments.join(', ');
    const segmentsContent = (
      <span className={classes['segments-subtitle']}>
        This course is available to: <span className={classes['bold']}>{segmentsStr}</span>
      </span>
    );

    const popoverContent = <div className={classes['segments-popover-content']}>{segmentsStr}</div>;

    return <WMPopover content={popoverContent}>{segmentsContent}</WMPopover>;
  }, []);

  const subTitle = useMemo(
    () => courseSegments && Boolean(courseSegments.length) && getSegments(courseSegments),
    [courseSegments, getSegments],
  );

  const skeletonButtonStyle = useMemo(() => ({ width: 50 }), []);

  const editButtonPath = useMemo(() => `${BASE_COURSE_EDITOR_ROUTE.path}/${courseMetadata?.id}`, [
    courseMetadata?.id,
  ]);

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
                <Link to={editButtonPath}>Edit</Link>
              </WMButton>
            </>
          ) : (
            <>
              <WMSkeletonAvatar className={classes['course-details-icon']} active />
              <WMSkeletonInput className={classes['course-name']} active />
              <WMSkeletonButton active style={skeletonButtonStyle} />
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
      subTitle={subTitle}
      {...otherProps}
    />
  );
}

export default React.memo(CourseScreenHeader);
