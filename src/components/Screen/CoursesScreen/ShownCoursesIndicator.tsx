import React, { ReactElement } from 'react';

import { useCoursesContext } from '../../../providers/CoursesContext';

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
            ? `${selectedRowsCount} course${selectedRowsCount > 1 ? 's' : ''} selected`
            : `Showing ${shownCoursesCount} course${shownCoursesCount > 1 ? 's' : ''}`}
        </>
      ) : null}
    </div>
  );
}
