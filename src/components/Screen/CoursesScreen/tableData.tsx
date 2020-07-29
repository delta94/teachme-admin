/* eslint-disable react/display-name */
import React, { ReactElement } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { SortableHandle } from 'react-sortable-hoc';

import { PublishStatus, UICourse } from '../../../walkme/data';

import { WMTagColor } from '../../common/WMTag';
import {
  DashCell,
  DragHandleCell,
  LinkCell,
  NumberCell,
  StatusDotCell,
  TagCell,
  TextArrayCell,
} from '../../common/tableCells';

const DragHandle = SortableHandle(() => <DragHandleCell />);

const publishStatusColors = {
  [PublishStatus['Published']]: WMTagColor.Green,
  [PublishStatus['Modified']]: WMTagColor.Green,
  [PublishStatus['Draft']]: WMTagColor.Orange,
  [PublishStatus['Archived']]: WMTagColor.Gray,
  undefined: WMTagColor.Gray,
};

const publishStatusLabels = {
  [PublishStatus['Published']]: 'published',
  [PublishStatus['Modified']]: 'modified',
  [PublishStatus['Draft']]: 'draft',
  [PublishStatus['Archived']]: 'archived',
};

export const columns: ColumnsType<any> = [
  {
    title: '',
    dataIndex: 'sort',
    className: 'drag-visible',
    render: (): ReactElement => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'title',
    render: (value: string, { title, id }: UICourse): ReactElement => (
      <LinkCell value={title} to={`/course/${id}`} />
    ),
  },
  {
    title: 'Production Status',
    dataIndex: 'publishStatus',
    render: (value: PublishStatus): ReactElement => {
      const color: string = publishStatusColors[value as keyof typeof publishStatusColors];

      return (
        <TagCell
          value={publishStatusLabels[value as keyof typeof publishStatusLabels]}
          color={color}
        />
      );
    },
  },
  {
    title: 'Segment',
    dataIndex: 'segments',
    render: (value: Array<string>): ReactElement => <TextArrayCell value={value} />,
  },
  {
    title: 'Users Started',
    dataIndex: 'users_started',
    align: 'right',
    render: (value: number): ReactElement => (
      <DashCell value={value}>
        <NumberCell value={value} />
      </DashCell>
    ),
  },
  {
    title: 'Users Completed',
    dataIndex: 'users_completed',
    align: 'right',
    render: (value: number, { users_completed, users_started }: UICourse): ReactElement => (
      <DashCell value={users_completed}>
        {users_completed && users_started && (
          <NumberCell
            value={`${users_completed} (${Math.round((users_completed / users_started) * 100)})%`}
          />
        )}
      </DashCell>
    ),
  },
  {
    title: 'Avg. Quiz Score',
    dataIndex: 'avg_quiz_score',
    align: 'right',
    render: (value: number, { avg_quiz_score, quiz_passed }: UICourse): ReactElement => (
      <DashCell value={avg_quiz_score === 0 ? undefined : avg_quiz_score}>
        {avg_quiz_score && <StatusDotCell value={avg_quiz_score} passed={quiz_passed} />}
      </DashCell>
    ),
  },
  {
    title: 'Avg. Quiz attempts',
    dataIndex: 'avg_quiz_attempts',
    align: 'right',
    render: (value: number): ReactElement => (
      <DashCell value={value}>
        <NumberCell value={typeof value === 'number' ? value.toFixed(1) : value} />
      </DashCell>
    ),
  },
];
