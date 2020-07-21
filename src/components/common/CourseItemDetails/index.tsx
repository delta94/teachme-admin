import React, { ReactElement, useState } from 'react';
import { ContentItem } from '@walkme/types';

import WMVerticalRadioGroup from '../WMVerticalRadioGroup';

import classes from './style.module.scss';

export default function CourseItemDetails({
  courseItem,
}: {
  courseItem: ContentItem;
}): ReactElement {
  const [value, setValue] = useState<number>(0);

  const options = [
    { label: 'Item is opened', value: 0 },
    {
      label: 'Reaching item’s goal',
      value: 1,
    },
  ];

  function onOptionChange(value: any) {
    setValue(value);
  }

  return (
    <div className={classes['course-item-details']}>
      {courseItem && (
        <>
          <p className={classes['label']}>Item is completed when:</p>
          <WMVerticalRadioGroup options={options} onChange={onOptionChange} value={value} />
        </>
      )}
    </div>
  );
}
