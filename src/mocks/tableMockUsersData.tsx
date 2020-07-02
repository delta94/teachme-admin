/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import moment from 'moment';

import TextCell from '../components/common/tableCells/TextCell';
import WarningCell from '../components/common/tableCells/WarningCell';
import NumberCell from '../components/common/tableCells/NumberCell';
import StatusDotCell from '../components/common/tableCells/StatusDotCell';
import SubtextCell from '../components/common/tableCells/SubtextCell';

const tableDateFormat = 'MMM. D, YYYY';

export const columns: ColumnsType<any> = [
  {
    title: 'User',
    dataIndex: 'user',
    render: (value: string) => <TextCell value={<b>{value}</b>} />,
  },
  {
    title: 'Course Name',
    dataIndex: 'courseName',
    render: (value: string) => <TextCell value={value} />,
  },
  {
    title: 'Started',
    dataIndex: 'started',
    render: (value: Date) => {
      const range = moment(value).fromNow();
      const formattedDate = moment(value).format(tableDateFormat);

      return <SubtextCell value={range} subtext={formattedDate} />;
    },
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    render: (value: Date) => {
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
    dataIndex: 'timeToComplete',
    render: (value: string) =>
      value ? <NumberCell value={value} /> : <WarningCell value="Did not complete" />,
  },
  {
    title: 'Quiz Result',
    dataIndex: 'quizResult',
    align: 'right',
    render: (value: number) =>
      value ? (
        <StatusDotCell value={value} passingValue={66} />
      ) : (
        <WarningCell value="Did not submit" />
      ),
  },
  {
    title: 'No. of quiz attempts',
    dataIndex: 'noOfQuizAttempts',
    align: 'right',
    render: (value: string) =>
      value ? <NumberCell value={value} /> : <WarningCell value="Did not complete" />,
  },
];

export const data = [
  {
    key: '1',
    user: 'shiran@reallygood.co.il',
    courseName: 'Course 1',
    started: 'Mar 19, 2019',
    completed: 'Jun 19, 2020',
    timeToComplete: '1 day',
    quizResult: 50,
    noOfQuizAttempts: 3,
  },
  {
    key: '2',
    user: 'dvir@reallygood.co.il',
    courseName: 'Course 5',
    started: 'Mar 19, 2019',
    completed: 'Mar 19, 2019',
    timeToComplete: '5 days',
    quizResult: 60,
    noOfQuizAttempts: 2,
  },
  {
    key: '3',
    user: 'roni@reallygood.co.il',
    courseName: 'Course 2',
    started: 'June 19, 2019',
    completed: 'Mar 19, 2019',
    timeToComplete: '1 week',
    quizResult: 90,
    noOfQuizAttempts: 1,
  },
  {
    key: '4',
    user: 'shahar@reallygood.co.il',
    courseName: 'Course 4',
    started: 'Mar 19, 2019',
    completed: 'Mar 19, 2019',
    timeToComplete: '3 days',
    quizResult: 70,
    noOfQuizAttempts: 3,
  },
  {
    key: '5',
    user: 'nofar@reallygood.co.il',
    courseName: 'Course 1',
    started: 'Mar 19, 2019',
    completed: 'Mar 19, 2019',
    timeToComplete: '1 day',
    quizResult: 65,
    noOfQuizAttempts: 1,
  },
  {
    key: '6',
    user: 'denise@reallygood.co.il',
    courseName: 'Course 2',
    started: 'Mar 19, 2019',
    completed: 'Mar 19, 2019',
    timeToComplete: '1 week',
    quizResult: 95,
    noOfQuizAttempts: 1,
  },
  {
    key: '7',
    user: 'all@reallygood.co.il',
    courseName: 'Course 3',
    started: 'Mar 19, 2019',
    completed: undefined,
    timeToComplete: '',
    quizResult: '',
    noOfQuizAttempts: '',
  },
  {
    key: '8',
    user: 'teachme@reallygood.co.il',
    courseName: 'Course 4',
    started: 'Mar 19, 2019',
    completed: undefined,
    timeToComplete: '',
    quizResult: '',
    noOfQuizAttempts: '',
  },
];
