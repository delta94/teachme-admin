import React, { ReactElement } from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement((props: any) => <tr {...props} />);

export default function SortableRow({ ...restProps }): ReactElement {
  const index = restProps['data-row-key'] as number;

  return <SortableItem index={index} {...restProps} />;
}
