import React, { ReactElement } from 'react';

import {
  courseOutlineTableMockData,
  courseOutlineTableMockColumns,
} from '../../../constants/mocks/courseOutlineMock';

import WMTable from '../../common/WMTable';

export default function CourseOutlineTable({ course }: { course: any }): ReactElement {
  return (
    <WMTable
      data={courseOutlineTableMockData as Array<any>}
      columns={courseOutlineTableMockColumns}
      expandable={{
        defaultExpandAllRows: true,
      }}
      rowClassName={(record) => record.className}
    />
  );
}
