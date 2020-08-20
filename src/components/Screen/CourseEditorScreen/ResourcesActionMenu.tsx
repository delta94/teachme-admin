import React, { ReactElement } from 'react';

import { useCourseEditorContext } from '../../../providers/CourseEditorContext';
import { CourseItemType } from '../../../interfaces/course.interfaces';

import Icon, { IconType } from '../../common/Icon';
import { AddButton } from '../../common/buttons';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';

import classes from './style.module.scss';

const options: IWMDropdownOption[] = [
  {
    id: 0,
    value: CourseItemType.Article,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.ArticleSmall} />
        Create Article
      </div>
    ),
  },
  {
    id: 1,
    value: CourseItemType.Video,
    label: (
      <div className={classes['option']}>
        <Icon type={IconType.VideoSmall} />
        Create Video
      </div>
    ),
  },
];

export default function ResourcesActionMenu({
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
    onActionSelected && onActionSelected(selected.value as CourseItemType);
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
