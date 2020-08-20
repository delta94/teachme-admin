import React, { ReactNode, ReactElement, Key } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface';
import produce from 'immer';
import cc from 'classcat';

import WMTableExpanded from './WMTableExpanded';
import SortableTableBody from './SortableTableBody';
import SortableRow from './SortableRow';

import classes from './style.module.scss';

export { WMTableExpanded };

interface IWMTable extends TableProps<any> {
  children?: ReactNode;
  columns?: ColumnsType<any>;
  data: Array<any>;
  rowSelection?: TableRowSelection<any>;
  onSortEnd?: (
    { oldIndex, newIndex }: { oldIndex: number; newIndex: number },
    updatedData: Array<any>,
    updatedSelectedRowKeys?: Array<Key>,
  ) => void;
  onSortStart?: ({
    isSource,
    payload,
    willAcceptDrop,
  }: {
    isSource: boolean;
    payload: number;
    willAcceptDrop: boolean;
  }) => void;
  isStickyToolbarAndHeader?: boolean;
}

export default function WMTable({
  children,
  columns,
  data,
  rowSelection,
  onSortEnd,
  onSortStart,
  isStickyToolbarAndHeader,
  ...otherProps
}: IWMTable): ReactElement {
  function onSortStartCallback({
    isSource,
    payload,
    willAcceptDrop,
  }: {
    isSource: boolean;
    payload: number;
    willAcceptDrop: boolean;
  }) {
    // the dragged table row looses cell widths because when it is dragged it looses the context of the table

    // source row for cell widths
    const tableHeader = document.querySelector('thead tr');
    let tableHeaderCells: NodeListOf<HTMLElement> | undefined;
    if (tableHeader) {
      tableHeaderCells = tableHeader.childNodes as NodeListOf<HTMLElement>;
    }

    // update draggedRow cell sizes from source
    requestAnimationFrame(() => {
      // get the second result, since the first row still exists and were looking for the copy
      const draggedRow = document.querySelectorAll(`tr[data-row-key="${payload}"]`)[1];
      if (draggedRow) {
        draggedRow.childNodes.forEach((node: ChildNode, idx: number) => {
          if (tableHeaderCells) {
            (node as HTMLElement).style.width = `${tableHeaderCells[idx].offsetWidth}px`;
            (node as HTMLElement).style.height = `${tableHeaderCells[idx].offsetHeight}px`;
          }
        });
      }
    });

    if (onSortStart) {
      onSortStart({ isSource, payload, willAcceptDrop });
    }
  }

  const onSortEndCallback = ({
    removedIndex,
    addedIndex,
  }: {
    addedIndex: number | undefined | null;
    removedIndex: number | undefined | null;
    destinationItemID: string | undefined;
    payload: any;
  }) => {
    const isAdd = addedIndex !== undefined && addedIndex !== null;
    const isRemove = removedIndex !== undefined && removedIndex !== null;
    const isReorder = isAdd && isRemove;

    let updatedData = data;
    if (isReorder) {
      updatedData = produce(data, (draft) => {
        // Remove moved row and store it
        const moved = draft.splice(removedIndex ?? 0, 1);
        // Insert stored row into new position
        draft.splice(addedIndex ?? 0, 0, moved[0]);
      });
    }

    if (onSortEnd)
      onSortEnd({ newIndex: addedIndex ?? 0, oldIndex: removedIndex ?? 0 }, updatedData, []);
  };

  const SortableWrapper = (props: any) => (
    <SortableTableBody onSortEnd={onSortEndCallback} onSortStart={onSortStartCallback} {...props} />
  );
  SortableWrapper.displayName = 'SortableWrapper';

  const sortableComponentProps = {
    components: {
      body: {
        wrapper: SortableWrapper,
        row: SortableRow,
      },
    },
  };
  const isSortable = typeof onSortEnd === 'function';
  const componentsProps = isSortable ? sortableComponentProps : {};

  return (
    <div
      className={cc([
        classes['wm-table'],
        { [classes['sticky-headings']]: isStickyToolbarAndHeader },
      ])}
    >
      {children && <div className={classes['toolbar']}>{children}</div>}
      <Table
        rowSelection={rowSelection}
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey={(record: any, index?: number) => index as Key}
        {...componentsProps}
        {...otherProps}
      />
    </div>
  );
}
