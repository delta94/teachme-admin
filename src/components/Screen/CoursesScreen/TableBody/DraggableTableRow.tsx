import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import { DraggableProps } from 'react-smooth-dnd/dist/src/Draggable';

export default function DraggableTableRow(props: DraggableProps): ReactElement {
  return <Draggable render={() => <tr {...props} />} />;
}
