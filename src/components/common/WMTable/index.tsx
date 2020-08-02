import React, { ReactNode, ReactElement } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface';
import { SortEnd, SortEvent, SortStart, SortStartHandler } from 'react-sortable-hoc';

import { useAppSkeleton } from '../../../hooks/skeleton';

import WMSkeleton from '../WMSkeleton';

import SortableTableBody from './SortableTableBody';
import SortableRow from './SortableRow';

import classes from './style.module.scss';

interface IWMTable extends TableProps<any> {
  children?: ReactNode;
  columns?: ColumnsType<any>;
  data: Array<any>;
  rowSelection?: TableRowSelection<any>;
  onSortEnd?: (sortedData: Array<any>) => void;
  onSortStart?: SortStartHandler;
}

export default function WMTable({
  children,
  columns,
  data,
  rowSelection,
  onSortEnd,
  onSortStart,
  ...otherProps
}: IWMTable): ReactElement {
  const appInit = useAppSkeleton();

  const isSortable = typeof onSortEnd === 'function';

  const onSortStartCallback = (sort: SortStart, event: SortEvent) => {
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
  };

  const onSortEndCallback = ({ oldIndex, newIndex }: SortEnd): void => {
    if (oldIndex !== newIndex && onSortEnd) {
      const updatedData = [...data];

      const movedItems = updatedData.splice(oldIndex, 1)[0]; // remove `oldIndex` item and store it
      updatedData.splice(newIndex, 0, movedItems); // insert stored item into position `newIndex`

      onSortEnd(updatedData);
    }
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

  const componentsProps = isSortable ? sortableComponentProps : {};

  return (
    <div className={classes['wm-table']}>
      {children && <div className={classes['toolbar']}>{children}</div>}
      {appInit ? (
        <Table
          rowSelection={rowSelection}
          pagination={false}
          dataSource={data}
          columns={columns}
          rowKey={(record: any, index?: number) => index as React.Key}
          {...componentsProps}
          {...otherProps}
        />
      ) : (
        <WMSkeleton active paragraph={{ rows: 10 }} />
      )}
    </div>
  );
}
