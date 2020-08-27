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
    value: CourseItemType.Article,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.ArticleSmall} />
        Create Article
      </div>
    ),
  },
  {
    id: 2,
    value: CourseItemType.Video,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.VideoSmall} />
        Create Video
      </div>
    ),
  },
  {
    id: 3,
    value: CourseItemType.Quiz,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.QuizSettings} />
        Add Quiz
      </div>
    ),
  },
];

export default function ActionMenu({
  className,
  onActionSelected,
  isLoading,
}: {
  className?: string;
  onActionSelected?: (selected: CourseItemType, lessonId?: number) => void;
  isLoading?: boolean;
}): ReactElement {
  const [{ course, quiz }, dispatch] = useCourseEditorContext();

  const onActionSelect = (selected: IWMDropdownOption) => {
    const { value } = selected;

    if (value === CourseItemType.Lesson) {
      // Add new lesson
      const newLesson = course?.items.addNewItem();
      if (newLesson) {
        const lessonId = getRandomNegativeNumber();
        newLesson.id = lessonId;
        onActionSelected && onActionSelected(CourseItemType.Lesson, lessonId);
      }
    } else if (value === CourseItemType.Quiz) {
      // Add new quiz
      dispatch({ type: ActionType.AddQuiz });
      onActionSelected && onActionSelected(CourseItemType.Quiz);
    } else {
      onActionSelected && onActionSelected(value as CourseItemType);
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
      disabled={isLoading}
    >
      <AddButton disabled={isLoading} className={className} />
    </WMDropdown>
  );
}
