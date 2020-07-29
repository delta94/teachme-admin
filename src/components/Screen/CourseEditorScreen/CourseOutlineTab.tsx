import React, { ReactElement } from 'react';

import { useCourseEditorContext } from '../../../providers/CourseEditorContext';

import { SearchFilter } from '../../common/filters';

import CourseOutlineQuiz from './CourseOutlineQuiz';
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
    <div className={classes['course-outline-tab']}>
      <ActionMenu className={classes['add-btn']} />
      {/* <SearchFilter
        className={classes['search']}
        placeholder="Search"
        value={courseOutlineSearchValue}
        onSearch={() => {
          console.log('searching');
        }}
      /> */}
      {course && (
        <CourseOutlineList items={course?.items.toArray() ?? []} course={course} hasQuiz={!!quiz} />
      )}
      {quiz && (
        <CourseOutlineQuiz
          item={quiz}
          quizItemClick={({ type, data }) => {
            console.log('quizItemClicked type ', type);
            console.log('quizItemClicked data ', data);
          }}
        />
      )}
    </div>
  );
}
