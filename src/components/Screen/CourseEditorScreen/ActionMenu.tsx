import React, { ReactElement } from 'react';

import { DetailsPanelSettingsType } from '../../../providers/CourseEditorContext/course-editor-context.interface';
import { useCourseEditorContext, ActionType } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';
import { getRandomNegativeNumber } from '../../../utils';

import Icon, { IconType } from '../../common/Icon';
import { AddButton } from '../../common/buttons';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import { ButtonVariantEnum } from '../../common/WMButton';

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
    skip: true, // TODO: remove this property when the feature is ready
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
    skip: true, // TODO: remove this property when the feature is ready
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
  onActionSelected?: (selected: CourseItemType, id?: number) => void;
  isLoading?: boolean;
}): ReactElement {
  const [{ course, quiz }, dispatch] = useCourseEditorContext();

  const onActionSelect = (selected: IWMDropdownOption) => {
    const { value } = selected;
    if (value === CourseItemType.Quiz) {
      // Add new quiz
      dispatch({ type: ActionType.AddQuiz });
      dispatch({
        type: ActionType.OpenDetailsPanel,
        activeDetailsItem: { type: DetailsPanelSettingsType.Quiz, id: quiz?.id ?? 0, item: quiz },
      });
      onActionSelected && onActionSelected(CourseItemType.Quiz);
    } else {
      // Add new lesson | article | video
      const newResource = course?.items.addNewItem();
      if (newResource) {
        const newResourceId = getRandomNegativeNumber();
        newResource.id = newResourceId;
        onActionSelected && onActionSelected(value as CourseItemType, newResourceId);
      }
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
      <AddButton
        disabled={isLoading}
        className={className}
        variant={ButtonVariantEnum.Create}
        tooltipTitle="Add Item"
      >
        Add
      </AddButton>
    </WMDropdown>
  );
}
