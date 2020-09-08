/* eslint-disable react/display-name */
import React, { ReactElement } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { SortableHandle } from 'react-sortable-hoc';

import { UICourse, PublishStatus } from '../../../walkme/data';
import { getPublishStatusColor, getPublishStatusLabel, isValidNumber } from '../../../utils';

import {
  DashCell,
  DragHandleCell,
  LinkCell,
  NumberCell,
  StatusDotCell,
  TagCell,
  TextCell,
} from '../../common/tableCells';
import WMPopover from '../../common/WMPopover';
import ActionsCell from './ActionsCell';

import classes from './style.module.scss';

const DragHandle = SortableHandle(() => <DragHandleCell />);

const FakeCheckboxCell = () => <span className={classes['checkbox']} />;

export const getColumns = (onSelectAllRows: () => void): ColumnsType<any> => [
  {
    title: '',
    dataIndex: 'sort',
    className: 'drag-visible',
    width: 35,
    render: (): ReactElement => <DragHandle />,
    shouldCellUpdate: () => false,
  },
  {
    title: (): ReactElement => <FakeCheckboxCell />,
    dataIndex: 'checkbox',
    className: classes['checkbox-cell'],
    width: 35,
    render: (): ReactElement => <FakeCheckboxCell />,
    shouldCellUpdate: () => false,
    onHeaderCell: () => ({
      onClick: onSelectAllRows,
    }),
  },
  {
    title: 'Name',
    dataIndex: 'title',
    render: (value: string, { title, id }: UICourse): ReactElement => (
      <LinkCell value={title} to={`/course/${id}`} />
    ),
    shouldCellUpdate: () => false,
  },
  {
    title: 'Production Status',
    dataIndex: 'publishStatus',
    render: (value: PublishStatus): ReactElement => (
      <TagCell value={getPublishStatusLabel(value)} color={getPublishStatusColor(value)} />
    ),
    shouldCellUpdate: () => false,
  },
  {
    title: 'Segment',
    dataIndex: 'segments',
    render: (value: Array<string>): ReactElement => {
      const segmentsStr = value.join(', ');
      // detecting string length, or the length of segments array.
      const showPopover = segmentsStr.length > 30 || value.length > 2;
      const popoverContent = (
        <div className={classes['segments-popover-content']}>
          <span>{segmentsStr}</span>
        </div>
      );

      const SegmentsTextCell = (
        <TextCell className={classes['segments-cell']} value={segmentsStr} />
      );

      return showPopover ? (
        <WMPopover content={popoverContent}>{SegmentsTextCell}</WMPopover>
      ) : (
        SegmentsTextCell
      );
    },
    shouldCellUpdate: () => false,
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
    shouldCellUpdate: () => false,
  },
  {
    title: 'Users Completed',
    dataIndex: 'users_completed',
    align: 'right',
    render: (value: number, { users_completed, users_started }: UICourse): ReactElement => (
      <DashCell value={users_completed}>
        {users_completed && users_started && (
          <NumberCell
            value={`${users_completed} (${Math.round((users_completed / users_started) * 100)}%)`}
          />
        )}
      </DashCell>
    ),
    shouldCellUpdate: () => false,
  },
  {
    title: 'Avg. Quiz Score',
    dataIndex: 'avg_quiz_score',
    align: 'right',
    render: (value: number, { avg_quiz_score, quiz_passed }: UICourse): ReactElement => (
      <DashCell value={isValidNumber(avg_quiz_score) ? avg_quiz_score : undefined}>
        {isValidNumber(avg_quiz_score) && (
          <StatusDotCell value={avg_quiz_score ?? 0} passed={quiz_passed} />
        )}
      </DashCell>
    ),
    shouldCellUpdate: () => false,
  },
  {
    title: 'Avg. Quiz attempts',
    dataIndex: 'avg_quiz_attempts',
    align: 'right',
    className: classes['actions-placeholder'],
    render: (value: number): ReactElement => (
      <DashCell value={value}>
        <NumberCell value={typeof value === 'number' ? value.toFixed(1) : value} />
      </DashCell>
    ),
    shouldCellUpdate: () => false,
  },
  {
    title: 'actions',
    dataIndex: 'actions',
    align: 'right',
    className: classes['actions-column'],
    render: (data: undefined, row: UICourse): ReactElement => <ActionsCell course={row} />,
    shouldCellUpdate: () => false,
  },
];
