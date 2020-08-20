import React, { ReactElement } from 'react';
import { Container } from 'react-smooth-dnd';

export default function SortableTableBody({
  onSortEnd,
  onSortStart,
  ...otherProps
}: {
  onSortEnd: any;
  onSortStart?: any;
}): ReactElement {
  return (
    <Container
      lockAxis="y"
      onDragStart={onSortStart}
      onDrop={onSortEnd}
      render={(ref) => <tbody ref={ref} {...otherProps} />}
      getChildPayload={(index) => index}
    />
  );
}
