import React, { ReactNode, ReactElement } from 'react';
import { Table } from 'antd';

import classes from './style.module.scss';
import { TableProps } from 'antd/lib/table';

interface IWMTable extends TableProps<any> {
  children?: ReactNode;
  columns?: any;
  data: Array<any>;
}

export default function WMTable({
  children,
  columns,
  data,
  ...otherProps
}: IWMTable): ReactElement {
  return (
    <div className={classes['wm-table']}>
      {children && <div className={classes['toolbar']}>{children}</div>}
      <Table columns={columns} dataSource={data} pagination={false} {...otherProps} />
    </div>
  );
}
