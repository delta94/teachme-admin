import React, { ReactElement } from 'react';
import { Table } from 'antd';

type PropTypes = { columns?: any; data: Array<any> };

export default function WMTable({ columns, data }: PropTypes): ReactElement {
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
