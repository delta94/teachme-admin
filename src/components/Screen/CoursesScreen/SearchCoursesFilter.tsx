import React, { ReactElement } from 'react';

import { useCoursesContext, ActionType } from '../../../providers/CoursesContext';

import { SearchFilter } from '../../common/filters';

import classes from './style.module.scss';

export default function SearchCoursesFilter({ disabled }: { disabled?: boolean }): ReactElement {
  const [state, dispatch] = useCoursesContext();
  const { courses, coursesSearchValue } = state;

  const onSearch = (searchValue: string) => {
    const newCourseList = courses.filter(({ title }) =>
      title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetCoursesSearchValue,
      coursesSearchValue: searchValue,
      courses: newCourseList,
    });
  };

  return (
    <SearchFilter
      className={classes['search-courses-filter']}
      placeholder="Search course name"
      value={coursesSearchValue}
      onSearch={onSearch}
      disabled={disabled}
    />
  );
}
