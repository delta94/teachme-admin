import React, { ReactElement } from 'react';

import { useCoursesContext } from '../../../providers/CoursesContext';
import { pluralizer } from '../../../utils';

import classes from './style.module.scss';

export default function ShownCoursesIndicator(): ReactElement {
  const [{ courses, filteredCourses, selectedRows }] = useCoursesContext();

  const selectedRowsCount = selectedRows.length;
  const shownCoursesCount = filteredCourses.length;

  return (
    <div className={classes['shown-courses-indicator']}>
      {courses.length ? (
        <>
          {selectedRowsCount
            ? `${selectedRowsCount} ${pluralizer('course', selectedRowsCount)} selected`
            : `Showing ${shownCoursesCount} ${pluralizer('course', shownCoursesCount)}`}
        </>
      ) : null}
    </div>
  );
}
