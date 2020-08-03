import React, { ReactElement, ReactNode } from 'react';
import { Container, DropResult } from 'react-smooth-dnd';
import produce from 'immer';

import { useCoursesContext, sortTable, ActionType } from '../../../../providers/CoursesContext';

import DraggableTableRow from './DraggableTableRow';
import classes from './style.module.scss';

export { DraggableTableRow };

interface ITableBody {
  className: string;
  children: ReactNode;
}

export default function TableBody(props: ITableBody): ReactElement {
  const [{ courses, selectedRowKeys }, dispatch] = useCoursesContext();

  const onDrop = ({ removedIndex, addedIndex, payload }: DropResult) => {
    if (
      typeof removedIndex !== 'number' ||
      typeof addedIndex !== 'number' ||
      typeof payload?.id !== 'number'
    )
      return;

    const newCourses = produce(courses, (draft) => {
      const moved = draft.splice(removedIndex, 1);
      draft.splice(addedIndex, 0, moved[0]);
    });

    const newSelectedRowKeys = produce(selectedRowKeys, (draft) => {
      draft.forEach((rowKey, index) => {
        const key = Number(rowKey);

        if (key < removedIndex && key >= addedIndex) {
          // Row moved to before selected row
          draft[index] = key + 1;
        } else if (key > removedIndex && key <= addedIndex) {
          // Row moved to after selected row
          draft[index] = key - 1;
        } else if (key === removedIndex && key !== addedIndex) {
          // Row moved is same as selected row
          draft[index] = addedIndex;
        }
      });
    });

    dispatch({
      type: ActionType.UpdateCoursesTable,
      courses: newCourses,
      selectedRowKeys: newSelectedRowKeys,
    });

    sortTable(dispatch, payload.id, removedIndex, addedIndex);
  };

  return (
    <Container
      onDrop={onDrop}
      getChildPayload={(index) => courses[index]}
      // TODO: fix table-row-ghost styles + its position before drop
      dragClass={classes['table-row-ghost']}
      dropPlaceholder={{
        animationDuration: 150,
        showOnTop: true,
        className: classes['drop-preview'],
      }}
      render={(ref) => <tbody ref={ref} {...props} />}
    />
  );
}
