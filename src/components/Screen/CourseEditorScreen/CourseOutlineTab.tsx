import React, { ReactElement, useState, useEffect } from 'react';

import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import { DetailsPanelSettingsType } from '../../../providers/CourseEditorContext/course-editor-context.interface';

import { CourseItemType } from '../../../interfaces/course.interfaces';
import CourseOutlineQuiz from './CourseOutlineQuiz';
import CourseOutlineList from './CourseOutlineList';
import ActionMenu from './ActionMenu';
import CourseOutlineListEmptyState from './CourseOutlineListEmptyState';
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
  const { course, quiz /* , courseOutlineSearchValue */ } = state;
  const [newQuizAdded, setNewQuizAdded] = useState(false);
  const [newLessonId, setNewLessonId] = useState<number>();

  const onItemClick = (item: any) => {
    dispatch({
      type: ActionType.OpenDetailsPanel,
      activeDetailsItem: { type: DetailsPanelSettingsType.Item, id: item.id, item },
    });
  };

  const onActionSelected = (selectedType: CourseItemType, lessonId?: number) => {
    if (selectedType === CourseItemType.Quiz) {
      setNewQuizAdded(true);

      // reset newQuizAdded
      setTimeout(() => setNewQuizAdded(false), 200);
    } else {
      lessonId && setNewLessonId(lessonId);

      // reset newLessonId
      setTimeout(() => setNewLessonId(undefined), 200);
    }
  };

  // unmount only
  useEffect(
    () => () => {
      setNewQuizAdded(false);
      setNewLessonId(undefined);
    },
    [],
  );

  return (
    <div className={classes['course-outline-tab']}>
      <ActionMenu className={classes['add-btn']} onActionSelected={onActionSelected} />
      {/* <SearchFilter
        className={classes['search']}
        placeholder="Search"
        value={courseOutlineSearchValue}
        onSearch={() => {
          console.log('searching');
        }}
      /> */}
      {!quiz && !course?.items.toArray().length && (
        <CourseOutlineListEmptyState containerClassName={classes['course-outline-empty-state']} />
      )}
      {course && (
        <CourseOutlineList
          items={course?.items.toArray() ?? []}
          course={course}
          handleItemClick={onItemClick}
          newLessonId={newLessonId}
        />
      )}
      {quiz && <CourseOutlineQuiz quiz={quiz} isNew={newQuizAdded} />}
    </div>
  );
}
