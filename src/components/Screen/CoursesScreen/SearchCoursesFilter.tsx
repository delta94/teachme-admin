import React, { Dispatch, ReactElement } from 'react';

import { ActionType } from '../../../providers/CoursesContext';
import { UICourse } from '../../../walkme/data';

import { SearchFilter } from '../../common/filters';

import classes from './style.module.scss';

function SearchCoursesFilter({
  disabled,
  courses,
  coursesSearchValue,
  dispatch,
}: {
  disabled?: boolean;
  courses: Array<UICourse>;
  coursesSearchValue?: string;
  dispatch: Dispatch<any>;
}): ReactElement {
  const onSearch = (searchValue: string) => {
    const newCourseList = courses.filter(({ title }: { title: string }) =>
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

export default React.memo(SearchCoursesFilter);
