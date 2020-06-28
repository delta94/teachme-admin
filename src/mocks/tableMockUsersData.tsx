import { ColumnsType } from 'antd/lib/table';
import StatusDot, { DotType } from '../components/common/StatusDot/index';
import React from 'react';

export const columns: ColumnsType<any> = [
  {
    title: 'User',
    dataIndex: 'user',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Course Name',
    dataIndex: 'courseName',
    render: (text: string) => <span> {text}</span>,
  },
  {
    title: 'Started',
    dataIndex: 'started',
    render: (text: string) => <span> {text}</span>,
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    render: (text: string) => {
      return <span> {text ? text : '⊘ Did not complete'}</span>;
    },
  },
  {
    title: 'Time to Complete',
    dataIndex: 'timeToComplete',
    render: (text: string) => {
      return <span> {text ? text : '⊘ Did not complete'}</span>;
    },
  },
  {
    title: 'Quiz Result',
    dataIndex: 'quizResult',
    render: (text: number) => {
      return (
        <>
          {text && <StatusDot type={text > 65 ? DotType.Success : DotType.Failure} />}
          <span> {text ? text : '⊘ Did not submit'}</span>
        </>
      );
    },
  },
  {
    title: 'No. of quiz attempts',
    dataIndex: 'noOfQuizAttempts',
    render: (text: number) => {
      return <span> {text ? text : '⊘ Did not complete'}</span>;
    },
  },
];

export const data = [
  {
    key: '1',
    user: 'shiran@reallygood.co.il',
    courseName: 'Course 1',
    started: '1.1.2020',
    completed: '1.2.2020',
    timeToComplete: '1 day',
    quizResult: 50,
    noOfQuizAttempts: 3,
  },
  {
    key: '2',
    user: 'dvir@reallygood.co.il',
    courseName: 'Course 5',
    started: '1.1.2020',
    completed: '1.2.2020',
    timeToComplete: '5 days',
    quizResult: 60,
    noOfQuizAttempts: 2,
  },
  {
    key: '3',
    user: 'roni@reallygood.co.il',
    courseName: 'Course 2',
    started: '1.1.2020',
    completed: '1.2.2020',
    timeToComplete: '1 week',
    quizResult: 90,
    noOfQuizAttempts: 1,
  },
  {
    key: '4',
    user: 'shahar@reallygood.co.il',
    courseName: 'Course 4',
    started: '1.1.2020',
    completed: '1.2.2020',
    timeToComplete: '3 days',
    quizResult: 70,
    noOfQuizAttempts: 3,
  },
  {
    key: '5',
    user: 'nofar@reallygood.co.il',
    courseName: 'Course 1',
    started: '1.1.2020',
    completed: '1.2.2020',
    timeToComplete: '1 day',
    quizResult: 65,
    noOfQuizAttempts: 1,
  },
  {
    key: '6',
    user: 'denise@reallygood.co.il',
    courseName: 'Course 2',
    started: '1.1.2020',
    completed: '1.2.2020',
    timeToComplete: '1 week',
    quizResult: 95,
    noOfQuizAttempts: 1,
  },
  {
    key: '7',
    user: 'all@reallygood.co.il',
    courseName: 'Course 3',
    started: '1.1.2020',
    completed: undefined,
    timeToComplete: '',
    quizResult: '',
    noOfQuizAttempts: '',
  },
  {
    key: '8',
    user: 'teachme@reallygood.co.il',
    courseName: 'Course 4',
    started: '1.1.2020',
    completed: undefined,
    timeToComplete: '',
    quizResult: '',
    noOfQuizAttempts: '',
  },
];
