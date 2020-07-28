import React, { ReactElement, useState, useEffect } from 'react';
import { ContentItem } from '@walkme/types';

import WMVerticalRadioGroup from '../WMVerticalRadioGroup';

import classes from './style.module.scss';

export enum CompletionType {
  ItemIsOpen,
  ReachingItemsGoal,
}

export default function CourseItemDetails({
  courseItem,
  courseItemChanged,
}: {
  courseItem: ContentItem;
  courseItemChanged: (courseItem: ContentItem) => void;
}): ReactElement {
  const [item, setItem] = useState(courseItem);

  const completionOptions = [
    { label: 'Item is opened', value: CompletionType.ItemIsOpen },
    {
      label: 'Reaching item’s goal',
      value: CompletionType.ReachingItemsGoal,
    },
  ];

  useEffect(() => {
    setItem(courseItem);
  }, [courseItem]);

  return (
    <div className={classes['course-item-details']}>
      {courseItem && (
        <>
          <p className={classes['label']}>Item is completed when:</p>
          <WMVerticalRadioGroup
            options={completionOptions}
            onChange={(value: any) => {
              item.properties.completionType = value;
              courseItemChanged(item);
            }}
            value={item.properties.completionType}
          />
        </>
      )}
    </div>
  );
}
