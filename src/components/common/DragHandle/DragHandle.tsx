import React, { ReactElement } from 'react';
import cc from 'classcat';

import { ReactComponent as DragHandleIcon } from '../../common/WMCollapse/dragHandleIcon.svg';

import classes from './style.module.scss';

export default function DragHandle({ className }: { className?: string }): ReactElement {
  return (
    <div className={cc([classes['drag-handle'], 'drag-handle', className])}>
      <DragHandleIcon />
    </div>
  );
}
