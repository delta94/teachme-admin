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

const tableDateFormat = 'MMM. D, YYYY';

export const columns: ColumnsType<any> = [
  {
    title: 'User',
    dataIndex: UsersColumn.ID,
    render: (value: string): ReactElement => <TextCell value={<b>{value}</b>} />,
  },
  {
    title: 'Course Name',
    dataIndex: UsersColumn.COURSE_ID,
    render: (value: string): ReactElement => <TextCell value={value} />,
  },
  {
    title: 'Started',
    dataIndex: UsersColumn.STARTED_DATE,
    render: (value: Date): ReactElement => {
      const range = moment(value).fromNow();
      const formattedDate = moment(value).format(tableDateFormat);

      return <SubtextCell value={range} subtext={formattedDate} />;
    },
  },
  {
    title: 'Completed',
    dataIndex: UsersColumn.COMPLETED_DATE,
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
    render: (value: string): ReactElement =>
      value ? <NumberCell value={value} /> : <WarningCell value="Did not complete" />,
  },
  {
    title: 'Quiz Result',
    dataIndex: UsersColumn.QUIZ_RESULT,
    align: 'right',
    render: (value: number): ReactElement =>
      value ? (
        <StatusDotCell value={value} passingValue={66} />
      ) : (
        <WarningCell value="Did not submit" />
      ),
  },
  {
    title: 'No. of quiz attempts',
    dataIndex: UsersColumn.QUIZ_ATTEMPTS,
    align: 'right',
    render: (value: string): ReactElement =>
      value ? <NumberCell value={value} /> : <WarningCell value="Did not complete" />,
  },
];
