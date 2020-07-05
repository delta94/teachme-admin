import React from 'react';
import { ColumnsType } from 'antd/lib/table';

import TagCell from '../../components/common/tableCells/TagCell';
import LinkCell from '../../components/common/tableCells/LinkCell';
import TextArrayCell from '../../components/common/tableCells/TextArrayCell';
import DashCell from '../../components/common/tableCells/DashCell';
import NumberCell from '../../components/common/tableCells/NumberCell';
import StatusDotCell from '../../components/common/tableCells/StatusDotCell';
import { WMTagColor } from '../../components/common/WMTag';

const labelColors: { [key: string]: string } = {
  published: WMTagColor.Green,
  modified: WMTagColor.Green,
  draft: WMTagColor.Orange,
  archived: WMTagColor.Gray,
  undefined: WMTagColor.Gray,
};

export const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: ({ value, id }: { value: string; id: number }) => (
      <LinkCell value={value} to={`/course/${id}`} />
    ),
  },
  {
    title: 'Production Status',
    dataIndex: 'productionStatus',
    render: (value: string) => {
      let color: string = labelColors[value];
      return <TagCell value={value} color={color} key={value} />;
    },
  },
  {
    title: 'Segment',
    dataIndex: 'segment',
    render: (value: Array<string>) => <TextArrayCell value={value} />,
  },
  {
    title: 'Users Started',
    dataIndex: 'usersStarted',
    align: 'right',
    render: (value: string) => (
      <DashCell value={value}>
        <NumberCell value={value} />
      </DashCell>
    ),
  },
  {
    title: 'Users Completed',
    dataIndex: 'usersCompleted',
    align: 'right',
    render: (value: string) => (
      <DashCell value={value}>
        <NumberCell value={value} />
      </DashCell>
    ),
  },
  {
    title: 'Avg. Quiz Score',
    dataIndex: 'avgQuizScore',
    align: 'right',
    render: (value: number | string) => (
      <DashCell value={value}>
        <StatusDotCell value={value} passingValue={51} />
      </DashCell>
    ),
  },
  {
    title: 'Avg. Quiz attempts',
    dataIndex: 'avgQuizAttempts',
    align: 'right',
    render: (value: string) => (
      <DashCell value={value}>
        <NumberCell value={value} />
      </DashCell>
    ),
  },
];

export const data = [
  {
    key: '1',
    name: { value: 'Workday for Managers', id: 1 },
    productionStatus: 'published',
    segment: ['Sales'],
    usersStarted: 389,
    usersCompleted: 343,
    avgQuizScore: 50,
    avgQuizAttempts: 3.4,
  },
  {
    key: '2',
    name: { value: 'Builder Fundamentals', id: 2 },
    productionStatus: 'draft',
    segment: ['Product', 'Sales'],
    usersStarted: undefined,
    usersCompleted: undefined,
    avgQuizScore: undefined,
    avgQuizAttempts: undefined,
  },
  {
    key: '3',
    name: { value: 'DAP Manager', id: 3 },
    productionStatus: 'archived',
    segment: ['All Employees'],
    usersStarted: 389,
    usersCompleted: 343,
    avgQuizScore: 90,
    avgQuizAttempts: 1.2,
  },
  {
    key: '4',
    name: { value: 'WalkMe Workstation', id: 4 },
    productionStatus: 'draft',
    segment: ['HR', 'Sales'],
    usersStarted: undefined,
    usersCompleted: undefined,
    avgQuizScore: undefined,
    avgQuizAttempts: undefined,
  },
  {
    key: '5',
    name: { value: 'Zendesk Fundamentals', id: 5 },
    productionStatus: 'published',
    segment: ['HR'],
    usersStarted: 879,
    usersCompleted: 400,
    avgQuizScore: 82,
    avgQuizAttempts: 0.8,
  },
  {
    key: '6',
    name: { value: 'DAP Manager 2', id: 6 },
    productionStatus: 'published',
    segment: ['All Employees'],
    usersStarted: 120,
    usersCompleted: 70,
    avgQuizScore: 90,
    avgQuizAttempts: 1.2,
  },
  {
    key: '7',
    name: { value: 'WalkMe Workstation', id: 7 },
    productionStatus: 'modified',
    segment: ['All Employees'],
    usersStarted: 500,
    usersCompleted: 421,
    avgQuizScore: 'No Quiz',
    avgQuizAttempts: undefined,
  },
  {
    key: '8',
    name: { value: 'Zendesk Fundamentals', id: 8 },
    productionStatus: 'draft',
    segment: ['HR'],
    usersStarted: undefined,
    usersCompleted: undefined,
    avgQuizScore: undefined,
    avgQuizAttempts: undefined,
  },
];
