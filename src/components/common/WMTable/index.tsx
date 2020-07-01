import React, { ReactElement } from 'react';
import { Table } from 'antd';

import classes from './style.module.scss';

type PropTypes = { columns?: any; data: Array<any> };

export default function WMTable({ columns, data }: PropTypes): ReactElement {
  return (
    <Table className={classes['wm-table']} columns={columns} dataSource={data} pagination={false} />
  );
}
