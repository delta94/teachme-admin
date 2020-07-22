import React, { ReactElement } from 'react';

import { useCourseEditorContext } from '../../../providers/CourseEditorContext';

import { SearchFilter } from '../../common/filters';
import CourseOutlineList from './CourseOutlineList';

import ActionMenu from './ActionMenu';
import classes from './style.module.scss';

export interface IProperties {
  isAvailable?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  passmark?: number;
  resultsViewActive?: boolean;
  isCompleted?: boolean;
}

export default function CourseOutlineTab(): ReactElement {
  const [state, dispatch] = useCourseEditorContext();
  const { course, courseOutlineSearchValue } = state;

  return (
    <>
      <ActionMenu className={classes['add-btn']} />
      <SearchFilter
        className={classes['search']}
        placeholder="Search"
        value={courseOutlineSearchValue}
        onSearch={() => {
          console.log('searching');
        }}
      />
      {course && <CourseOutlineList items={course?.items.toArray() ?? []} course={course} />}
    </>
  );
}
