import React, { ReactElement } from 'react';

import { CreateButton } from '../../common/buttons';
import Icon, { IconType } from '../../common/Icon';

import { columns } from './tableData';
import classes from './style.module.scss';

export default function CoursesEmptyState(): ReactElement {
  return (
    <td colSpan={columns.length + 1}>
      <div className={classes['courses-empty-state']}>
        <Icon className={classes['icon']} type={IconType.EmptyCourse} />
        <h1>No courses yet</h1>
        <p>Start creating courses by clicking the button below</p>
        <CreateButton />
      </div>
    </td>
  );
}
