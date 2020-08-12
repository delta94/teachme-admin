import React, { ReactElement } from 'react';

import Icon, { IconType } from '../Icon';

import classes from './style.module.scss';

export default function CoursesEmptyState(): ReactElement {
  return (
    <div className={classes['search-empty-state']}>
      <Icon className={classes['icon']} type={IconType.EmptySearch} />
      <h1>No Results</h1>
      <p>Please try different search</p>
    </div>
  );
}
