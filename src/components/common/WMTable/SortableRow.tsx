import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';

export default function SortableRow({ ...restProps }): ReactElement {
  const index = restProps['data-row-key'] as number;

  return (
    <Draggable
      key={index}
      render={() => (
        <tr {...restProps} data-class={restProps.className} style={{ display: 'table-row' }} />
      )}
    />
  );
}
