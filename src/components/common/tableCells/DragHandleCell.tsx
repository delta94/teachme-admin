import React, { ReactElement } from 'react';
import cc from 'classcat';

import { ITableCell } from './tableCells.interface';
import { ReactComponent as DragHandleIcon } from './dragHandleIcon.svg';
import classes from './style.module.scss';

export default function DragHandleCell({ className, ...otherProps }: ITableCell): ReactElement {
  return <DragHandleIcon className={cc([classes['drag-handle'], className])} {...otherProps} />;
}
