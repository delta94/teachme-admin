import React, { ReactElement } from 'react';

import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { getRandomFractionNumber } from '../../../utils';

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
  const [{ course }, dispatch] = useCourseEditorContext();

  const onActionSelect = (selected: IWMDropdownOption) => {
    if (selected.value === CourseItemType.Lesson) {
      // Add new lesson
      const newLesson = course?.items.addNewItem();
      if (newLesson) {
        newLesson.id = getRandomFractionNumber();
      }
    } else {
      // Add new quiz
      // TODO: add new quiz
      console.log('quiz added');
    }

    dispatch({ type: ActionType.UpdateCourseOutline });
  };

  return (
    <WMDropdown options={options} onSelectedChange={onActionSelect}>
      <AddButton className={className} />
    </WMDropdown>
  );
}
