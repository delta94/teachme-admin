import React, { ReactNode, ReactElement, Key, useCallback } from 'react';
import cc from 'classcat';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface';
import {
  SortEnd,
  SortEvent,
  SortStart,
  SortStartHandler,
  SortableContainerProps,
} from 'react-sortable-hoc';
import produce from 'immer';
import isEqual from 'lodash/isEqual';
import WMTableExpanded from './WMTableExpanded';
import SortableTableBody from './SortableTableBody';
import SortableRow from './SortableRow';

import classes from './style.module.scss';

export { WMTableExpanded };

interface IWMTable extends TableProps<any> {
  className?: string;
  children?: ReactNode;
  columns?: ColumnsType<any>;
  data: Array<any>;
  rowSelection?: TableRowSelection<any>;
  onSortEnd?: (
    { oldIndex, newIndex }: { oldIndex: number; newIndex: number },
    updatedData: Array<any>,
    updatedSelectedRowKeys?: Array<Key>,
  ) => void;
  onSortStart?: SortStartHandler;
  isStickyToolbarAndHeader?: boolean;
}

function WMTable({
  className,
  children,
  columns,
  data,
  rowSelection,
  onSortEnd,
  onSortStart,
  isStickyToolbarAndHeader,
  ...otherProps
}: IWMTable): ReactElement {
  const onSortStartCallback = useCallback(
    (sort: SortStart, event: SortEvent) => {
      const { node } = sort;
      const tds = document.getElementsByClassName('dragged-row')[0].childNodes as NodeListOf<
        HTMLElement
      >;

      node.childNodes.forEach((node: ChildNode, idx: number) => {
        tds[idx].style.width = `${(node as HTMLElement).offsetWidth}px`;
        tds[idx].style.height = `${(node as HTMLElement).offsetHeight}px`;
      });

      if (onSortStart) {
        onSortStart(sort, event);
      }
    },
    [onSortStart],
  );

  const onSortEndCallback = useCallback(
    ({ oldIndex, newIndex }: SortEnd): void => {
      if (oldIndex === newIndex || !onSortEnd) return;

      const updatedData = produce(data, (draft) => {
        // Remove moved row and store it
        const moved = draft.splice(oldIndex, 1);
        // Insert stored row into new position
        draft.splice(newIndex, 0, moved[0]);
      });

      const updatedSelectedRowKeys = produce(rowSelection?.selectedRowKeys, (draft) => {
        draft?.forEach((rowKey, index) => {
          const key = Number(rowKey);

          if (key < oldIndex && key >= newIndex) {
            // Row moved to before selected row
            draft[index] = key + 1;
          } else if (key > oldIndex && key <= newIndex) {
            // Row moved to after selected row
            draft[index] = key - 1;
          } else if (key === oldIndex && key !== newIndex) {
            // Row moved is same as selected row
            draft[index] = newIndex;
          }
        });
      });

      onSortEnd({ oldIndex, newIndex }, updatedData, updatedSelectedRowKeys);
    },
    [data, rowSelection, onSortEnd],
  );

  const SortableWrapper = useCallback(
    (props: SortableContainerProps) => (
      <SortableTableBody
        onSortEnd={onSortEndCallback}
        onSortStart={onSortStartCallback}
        {...props}
      />
    ),
    [onSortEndCallback, onSortStartCallback],
  );

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
  const rowKey = useCallback((record: any, index?: number) => index as Key, []);

  return (
    <div
      className={cc([
        classes['wm-table'],
        className,
        { [classes['sticky-headings']]: isStickyToolbarAndHeader },
      ])}
    >
      {children && <div className={classes['toolbar']}>{children}</div>}
      <Table
        rowSelection={rowSelection}
        pagination={false}
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        {...componentsProps}
        {...otherProps}
      />
    </div>
  );
}

export default React.memo(WMTable, (oldProps, newProps) => isEqual(oldProps, newProps));
