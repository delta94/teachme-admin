import React, { ReactElement } from 'react';
import {
  SortableContainer,
  SortEnd,
  SortEndHandler,
  SortEvent,
  SortStart,
  SortStartHandler,
} from 'react-sortable-hoc';
import cc from 'classcat';

import classes from './style.module.scss';

const DraggableContainer = SortableContainer(
  (
    props: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLTableSectionElement> &
      React.HTMLAttributes<HTMLTableSectionElement>,
  ): ReactElement => <tbody {...props} />,
);

export default function SortableTableBody({
  onSortEnd,
  onSortStart,
  ...otherProps
}: {
  onSortEnd: SortEndHandler;
  onSortStart?: SortStartHandler;
}): ReactElement {
  const onSortStartCallback = (sort: SortStart, event: SortEvent): void => {
    document.body.style.cursor = 'grabbing';

    if (onSortStart) onSortStart(sort, event);
  };

  const onSortEndCallback = (sort: SortEnd, event: SortEvent): void => {
    document.body.style.cursor = '';

    onSortEnd(sort, event);
  };

  return (
    <DraggableContainer
      lockAxis={'y'}
      useDragHandle
      helperClass={cc(['dragged-row', classes['dragged-row']])}
      onSortStart={onSortStartCallback}
      onSortEnd={onSortEndCallback}
      {...otherProps}
    />
  );
}
