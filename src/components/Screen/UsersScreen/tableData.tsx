/* eslint-disable react/display-name */
import { ColumnsType, ColumnType } from 'antd/lib/table';
import React, { ReactElement } from 'react';
import moment from 'moment';

import { isValidNumber } from '../../../utils';
import { UsersColumn, UserListUILineItem } from '../../../walkme/models';
import {
  TextCell,
  WarningCell,
  NumberCell,
  StatusDotCell,
  SubtextCell,
} from '../../common/tableCells';

import classes from './style.module.scss';

export type { ColumnType };

const tableDateFormat = 'MMM. D, YYYY';

export const getColumns = (onClick: (col: ColumnType<any>) => void): ColumnsType<any> => [
  {
    title: 'User',
    dataIndex: UsersColumn.ID,
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
    }),
    render: (value: string): ReactElement => (
      <TextCell className={classes['user-cell']} value={value} />
    ),
  },
  {
    title: 'Course Name',
    dataIndex: 'title',
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
    }),
    render: (value: string): ReactElement => (
      <TextCell className={classes['course-name-cell']} value={value} />
    ),
  },
  {
    title: 'Started',
    dataIndex: UsersColumn.STARTED_DATE,
    sorter: true,
    width: '13%',
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
    }),
    render: (value: Date): ReactElement => {
      const range = moment(value).fromNow();
      const formattedDate = moment(value).format(tableDateFormat);

      return <SubtextCell value={range} subtext={formattedDate} />;
    },
  },
  {
    title: 'Completed',
    dataIndex: UsersColumn.COMPLETED_DATE,
    sorter: true,
    width: '14.5%',
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
    }),
    render: (value: Date): ReactElement => {
      const range = moment(value).fromNow();
      const formattedDate = moment(value).format(tableDateFormat);

      return value ? (
        <SubtextCell value={range} subtext={formattedDate} />
      ) : (
        <WarningCell value="Did not complete" />
      );
    },
  },
  {
    title: 'Time to Complete',
    dataIndex: UsersColumn.TIME_TO_COMPLETE,
    width: '14.5%',
    render: (value: string): ReactElement =>
      value ? (
        <NumberCell value={moment.duration(value, 'milliseconds').humanize()} />
      ) : (
        <WarningCell value="Did not complete" />
      ),
  },
  {
    title: 'Quiz Result',
    dataIndex: UsersColumn.QUIZ_RESULT,
    align: 'right',
    sorter: true,
    width: '11%',
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
    }),
    render: (value: number, { quiz_passed }: UserListUILineItem): ReactElement =>
      isValidNumber(value) ? (
        <StatusDotCell value={value} passed={quiz_passed} />
      ) : (
        <WarningCell value="Did not submit" />
      ),
  },
  {
    title: 'No. of quiz attempts',
    dataIndex: UsersColumn.QUIZ_ATTEMPTS,
    align: 'right',
    sorter: true,
    width: '15.5%',
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
    }),
    render: (value: string): ReactElement =>
      value ? <NumberCell value={value} /> : <WarningCell value="Did not complete" />,
  },
];
