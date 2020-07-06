import React, { ReactElement } from 'react';

import { courseOutlineTableData } from '../../../constants/mocks/courseOutlineMock';

import TextCell from '../../common/tableCells/TextCell';
import WMTable from '../../common/WMTable';
import DashCell from '../../common/tableCells/DashCell';
import NumberCell from '../../common/tableCells/NumberCell';
import Icon, { IconType } from '../../common/Icon';
import IconTextCell from '../../common/tableCells/IconTextCell';

export default function CourseOutlineTable({ course }: { course: any }): ReactElement {
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'item-name',
      render: (value: string) => {
        // TODO: render icon
        return <TextCell value={value} />;
      },
    },
    {
      title: 'Users Completed Item',
      dataIndex: 'usersCompletedItem',
      key: 'users-completed-item',
      width: '15%',
      render: (value: number) => (
        <DashCell value={value}>
          <NumberCell value={value} />
        </DashCell>
      ),
    },
    {
      title: 'Drop-off',
      dataIndex: 'dropOff',
      key: 'drop-off',
      width: '15%',
      render: (value: number) => (
        <DashCell value={value}>
          <NumberCell value={value} />
        </DashCell>
      ),
    },
  ];

  return (
    <WMTable
      data={courseOutlineTableData as Array<any>}
      columns={columns}
      expandable={{
        defaultExpandAllRows: true,
      }}
      rowClassName={(record) => {
        return record.className;
      }}
    ></WMTable>
  );
}
