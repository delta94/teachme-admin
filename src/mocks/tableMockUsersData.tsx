import { ColumnsType } from 'antd/lib/table';
import StatusDot, { DotType } from '../components/common/StatusDot/index';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export const columns: ColumnsType<any> = [
  {
    title: 'User',
    dataIndex: 'user',
    render: (text: string) => <strong>{text}</strong>, // TODO: we should set the specific route to this user
  },
  {
    title: 'Course Name',
    dataIndex: 'courseName',
    render: (text: string) => <span> {text}</span>,
  },
  {
    title: 'Started',
    dataIndex: 'started',
    render: (text: Date) => {
      let range = moment(`${text}`).fromNow();
      return (
        <div>
          <div>{range}</div>
          <div> {text}</div>
        </div>
      );
    },
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    render: (text: Date) => {
      let range = moment(`${text}`).fromNow();
      return (
        <div>
          <div>{text && range}</div>
          <div> {text ? text : '⊘ Did not complete'}</div>
        </div>
      );
    },
  },
  {
    title: 'Time to Complete',
    dataIndex: 'timeToComplete',
    render: (text: string) => {
      // var a = moment([2007, 0, 28]);
      // var b = moment([2007, 0, 29]);
      // a.from(b);
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
