/* eslint-disable react/display-name */
import { ColumnsType } from 'antd/lib/table';
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

const tableDateFormat = 'MMM. D, YYYY';

export const columns: ColumnsType<any> = [
  {
    title: 'User',
    dataIndex: UsersColumn.ID,
    render: (value: string): ReactElement => (
      <TextCell className={classes['user-cell']} value={value} />
    ),
  },
  {
    title: 'Course Name',
    dataIndex: 'title',
    render: (value: string): ReactElement => <TextCell value={value} />,
  },
  {
    title: 'Started',
    dataIndex: UsersColumn.STARTED_DATE,
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
    render: (value: string): ReactElement =>
      value ? (
        <NumberCell className={classes['attempts-cell']} value={value} />
      ) : (
        <WarningCell className={classes['attempts-cell']} value="Did not complete" />
      ),
  },
];
