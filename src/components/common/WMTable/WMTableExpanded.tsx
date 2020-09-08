import React, { ReactNode, ReactElement } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { ColumnsType } from 'antd/lib/table/interface';

import classes from './style.module.scss';

interface IWMTableExpanded extends TableProps<any> {
  children?: ReactNode;
  columns?: ColumnsType<any>;
  data: Array<any>;
}

export default function WMTableExpanded({
  children,
  columns,
  data,
  ...otherProps
}: IWMTableExpanded): ReactElement {
  return (
    <div className={classes['wm-table-expanded']}>
      {children && <div className={classes['toolbar']}>{children}</div>}
      <Table
        pagination={false}
        dataSource={data}
        columns={columns}
        expandable={{ defaultExpandAllRows: true }}
        {...otherProps}
      />
    </div>
  );
}
