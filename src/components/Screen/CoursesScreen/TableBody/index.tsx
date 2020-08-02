import React, { ReactElement } from 'react';
import { Container, DropResult } from 'react-smooth-dnd';

import { useCoursesContext, sortTable } from '../../../../providers/CoursesContext';

import DraggableTableRow from './DraggableTableRow';

export { DraggableTableRow };

export default function TableBody(props: any): ReactElement {
  const [{ courses }, dispatch] = useCoursesContext();

  const onDrop = ({ removedIndex, addedIndex, payload }: DropResult) => {
    if (
      typeof removedIndex !== 'number' ||
      typeof addedIndex !== 'number' ||
      typeof payload?.id !== 'number'
    )
      return;

    sortTable(dispatch, courses, payload.id, removedIndex, addedIndex);
  };

  return (
    <Container
      onDrop={onDrop}
      getChildPayload={(index) => courses[index]}
      render={(ref) => <tbody ref={ref} {...props} />}
    />
  );
}
