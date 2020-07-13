import React, { ReactNode, ReactElement } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';

import classes from './style.module.scss';

interface IWMTable extends TableProps<any> {
  children?: ReactNode;
  columns?: any;
  data: Array<any>;
  rowSelection?: any;
}

export default function WMTable({
  children,
  columns,
  data,
  rowSelection,
  ...otherProps
}: IWMTable): ReactElement {
  return (
    <div className={classes['wm-table']}>
      {children && <div className={classes['toolbar']}>{children}</div>}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        {...otherProps}
      />
    </div>
  );
}
