import React, { ReactElement } from 'react';
import { ContentItem, CourseTaskCompletionType } from '@walkme/types';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';

import { WMVerticalRadioGroup } from '../../../common/WMRadio';

import classes from './style.module.scss';

const completionOptions = [
  {
    label: 'Item is completed',
    value: CourseTaskCompletionType.Completed,
    helpText:
      'The item will be marked as completed when the user completes the walk-thru or views a resource',
  },
  {
    label: 'Reaching item’s goal',
    value: CourseTaskCompletionType.Goal,
    helpText: 'You need to set a main goal before choosing this option',
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
            onChange={(e: any) => {
              courseItem.properties.completionType = e.target.value as CourseTaskCompletionType;
              dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
            }}
            value={courseItem.properties.completionType}
            showTooltipHelpText
          />
        </>
      )}
    </div>
  );
}
