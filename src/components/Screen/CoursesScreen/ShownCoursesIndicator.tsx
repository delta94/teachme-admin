import React, { ReactElement } from 'react';

import { useCoursesContext } from '../../../providers/CoursesContext';
import { pluralizer } from '../../../utils';

import WMSkeleton from '../../common/WMSkeleton';

import classes from './style.module.scss';

export default function ShownCoursesIndicator({
  isLoading = false,
}: {
  isLoading?: boolean;
}): ReactElement {
  const [{ courses, filteredCourses, selectedRows }] = useCoursesContext();

  const selectedRowsCount = selectedRows.length;
  const shownCoursesCount = filteredCourses.length;

  return (
    <div className={classes['shown-courses-indicator']}>
      <WMSkeleton loading={isLoading} active title={{ width: 150 }} paragraph={false}>
        {Boolean(courses.length) && (
          <>
            {selectedRowsCount
              ? `${selectedRowsCount} ${pluralizer('course', selectedRowsCount)} selected`
              : `Showing ${shownCoursesCount} ${pluralizer('course', shownCoursesCount)}`}
          </>
        )}
      </WMSkeleton>
    </div>
  );
}
