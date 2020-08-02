import React, { ReactElement } from 'react';
import { Container, DropResult } from 'react-smooth-dnd';

import DraggableTableRow from './DraggableTableRow';

export { DraggableTableRow };

export default function TableBody(props: any): ReactElement {
  const onDrop = ({ removedIndex, addedIndex }: DropResult) => {
    console.log('removedIndex ', removedIndex);
    console.log('addedIndex ', addedIndex);
  };

  return <Container onDrop={onDrop} render={(ref) => <tbody ref={ref} {...props} />} />;
}
