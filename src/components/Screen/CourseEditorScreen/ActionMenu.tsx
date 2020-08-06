import React, { ReactElement } from 'react';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { getRandomNegativeNumber } from '../../../utils';

import Icon, { IconType } from '../../common/Icon';
import { AddButton } from '../../common/buttons';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';

import classes from './style.module.scss';

const options: IWMDropdownOption[] = [
  {
    id: 0,
    value: CourseItemType.Lesson,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.LessonSmall} />
        Add Lesson
      </div>
    ),
  },
  {
    id: 1,
    value: CourseItemType.Quiz,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.LessonSmall} />
        Add Quiz
      </div>
    ),
  },
];

export default function ActionMenu({ className }: { className?: string }): ReactElement {
  const [{ course, quiz }, dispatch] = useCourseEditorContext();

  const onActionSelect = (selected: IWMDropdownOption) => {
    if (selected.value === CourseItemType.Lesson) {
      // Add new lesson
      const newLesson = course?.items.addNewItem();
      if (newLesson) {
        newLesson.id = getRandomNegativeNumber();
      }
    } else {
      // Add new quiz
      dispatch({ type: ActionType.AddQuiz });
    }

    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
  };

  return (
    <WMDropdown
      options={options.map((option) => {
        if (option.value === CourseItemType.Quiz && quiz) {
          return { ...option, disabled: true };
        }
        return option;
      })}
      onSelectedChange={onActionSelect}
    >
      <AddButton className={className} />
    </WMDropdown>
  );
}
