import React, { ReactElement } from 'react';

import { pluralizer } from '../../../utils';
import { UICourse } from '../../../walkme/data';

import WMSkeleton from '../../common/WMSkeleton';

import classes from './style.module.scss';

function ShownCoursesIndicator({
  isLoading = false,
  courses,
  filteredCourses,
  selectedRows,
}: {
  isLoading: boolean;
  courses: Array<UICourse>;
  filteredCourses: Array<UICourse>;
  selectedRows: Array<UICourse>;
}): ReactElement {
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

export default React.memo(ShownCoursesIndicator);
