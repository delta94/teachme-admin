/* eslint-disable react/display-name */
import { ColumnsType, ColumnType } from 'antd/lib/table';
import React, { ReactElement } from 'react';
import moment from 'moment';

import { UsersColumn } from '../../../walkme/models';
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
      className: classes['user-cell'],
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
      className: classes['course-name-cell'],
    }),
    render: (value: string): ReactElement => (
      <TextCell className={classes['course-name-cell']} value={value} />
    ),
  },
  {
    title: 'Started',
    dataIndex: UsersColumn.STARTED_DATE,
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
      className: classes['started-cell'],
    }),
    render: (value: Date): ReactElement => {
      const range = moment(value).fromNow();
      const formattedDate = moment(value).format(tableDateFormat);

      return (
        <SubtextCell className={classes['started-cell']} value={range} subtext={formattedDate} />
      );
    },
  },
  {
    title: 'Completed',
    dataIndex: UsersColumn.COMPLETED_DATE,
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
      className: classes['completed-cell'],
    }),
    render: (value: Date): ReactElement => {
      const range = moment(value).fromNow();
      const formattedDate = moment(value).format(tableDateFormat);

      return value ? (
        <SubtextCell className={classes['completed-cell']} value={range} subtext={formattedDate} />
      ) : (
        <WarningCell className={classes['completed-cell']} value="Did not complete" />
      );
    },
  },
  {
    title: 'Time to Complete',
    dataIndex: UsersColumn.TIME_TO_COMPLETE,
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
      className: classes['duration-cell'],
    }),
    render: (value: string): ReactElement =>
      value ? (
        <NumberCell className={classes['duration-cell']} value={value} />
      ) : (
        <WarningCell className={classes['duration-cell']} value="Did not complete" />
      ),
  },
  {
    title: 'Quiz Result',
    dataIndex: UsersColumn.QUIZ_RESULT,
    align: 'right',
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
      className: classes['result-cell'],
    }),
    render: (value: number): ReactElement =>
      value ? (
        <StatusDotCell className={classes['result-cell']} value={value} passingValue={66} />
      ) : (
        <WarningCell className={classes['result-cell']} value="Did not submit" />
      ),
  },
  {
    title: 'No. of quiz attempts',
    dataIndex: UsersColumn.QUIZ_ATTEMPTS,
    align: 'right',
    sorter: true,
    onHeaderCell: (col) => ({
      onClick: () => onClick(col),
      className: classes['attempts-cell'],
    }),
    render: (value: string): ReactElement =>
      value ? (
        <NumberCell className={classes['attempts-cell']} value={value} />
      ) : (
        <WarningCell className={classes['attempts-cell']} value="Did not complete" />
      ),
  },
];
