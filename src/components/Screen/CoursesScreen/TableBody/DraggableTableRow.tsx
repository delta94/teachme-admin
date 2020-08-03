import React, { ReactElement } from 'react';
import { Draggable } from 'react-smooth-dnd';
import { DraggableProps } from 'react-smooth-dnd/dist/src/Draggable';

interface IDraggableTableRow extends DraggableProps {
  'data-row-key': number;
}

export default function DraggableTableRow(props: IDraggableTableRow): ReactElement {
  return <Draggable render={() => <tr key={props['data-row-key']} {...props} />} />;
}
