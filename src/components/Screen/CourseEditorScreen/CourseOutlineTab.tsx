import React, { ReactElement } from 'react';

import { useCourseEditorContext } from '../../../providers/CourseEditorContext';

import { SearchFilter } from '../../common/filters';
import CourseOutlineQuiz from '../../common/lists/CourseOutlineQuiz';
import Icon, { IconType } from '../../common/Icon';
import WMButton from '../../common/WMButton';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import { CourseOutlineList } from '../../common/lists';

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
  const { course, quiz, courseOutlineSearchValue } = state;

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
      {course && (
        <CourseOutlineList
          items={course?.items.toArray() ?? []}
          course={course}
          hasQuiz={!!quiz}
        />
      )}
      {quiz && <CourseOutlineQuiz item={quiz} />}
    </>
  );
}
