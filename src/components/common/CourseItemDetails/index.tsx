import React, { ReactElement } from 'react';

import classes from './style.module.scss';

export default function CourseItemDetails({ courseItem }: { courseItem: any }): ReactElement {
  return <div className={classes['course-item-details']}>{courseItem && 'Some Details'}</div>;
}
