import React, { ReactElement } from 'react';
import { ContentItem } from '@walkme/types';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';

import { WMVerticalRadioGroup } from '../../../common/WMRadio';

import classes from './style.module.scss';

export enum CompletionType {
  ItemIsOpen,
  ReachingItemsGoal,
}

const completionOptions = [
  { label: 'Item is opened', value: CompletionType.ItemIsOpen },
  {
    label: 'Reaching item’s goal',
    value: CompletionType.ReachingItemsGoal,
  },
];

export default function CourseItemDetails({
  courseItem,
}: {
  courseItem: ContentItem;
}): ReactElement {
  const [state, dispatch] = useCourseEditorContext();

  return (
    <div className={classes['course-item-details']}>
      {courseItem && (
        <>
          <p className={classes['label']}>Item is completed when:</p>
          <WMVerticalRadioGroup
            options={completionOptions}
            onChange={(value: any) => {
              courseItem.properties.completionType = value;
              dispatch({ type: ActionType.UpdateCourseOutline });
            }}
            value={courseItem.properties.completionType}
          />
        </>
      )}
    </div>
  );
}
