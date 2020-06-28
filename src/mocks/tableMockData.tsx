import React from 'react';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';

const labelColors: { [key: string]: string } = {
  published: 'green',
  draft: 'orange',
  archive: 'gray',
};
const renderDash = (item: string) => item ?? `—`;
const renderTextArray = (arr: Array<string>) => arr.join(', ');

export const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <Link to="/single-course">{text}</Link>, // TODO: we should set the specific route to this course
  },
  {
    title: 'Production Status',
    dataIndex: 'productionStatus',
    render: (tag: string) => {
      let color: string = labelColors[tag];
      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Segment',
    dataIndex: 'segment',
    render: renderTextArray,
  },
  {
    title: 'Users Started',
    dataIndex: 'usersStarted',
    render: renderDash,
  },
  {
    title: 'Users Completed',
    dataIndex: 'usersCompleted',
    render: renderDash,
  },
  {
    title: 'Avg. Quiz Score',
    dataIndex: 'avgQuizScore',
    render: renderDash,
  },
  {
    title: 'Avg. Quiz attempts',
    dataIndex: 'avgQuizAttempts',
    render: renderDash,
  },
];

export const data = [
  {
    key: '1',
    name: 'Workday for Managers',
    productionStatus: 'published',
    segment: ['Sales'],
    usersStarted: 389,
    usersCompleted: 343,
    avgQuizScore: 50,
    avgQuizAttempts: 3.4,
  },
  {
    key: '2',
    name: 'Builder Fundamentals',
    productionStatus: 'draft',
    segment: ['Product', 'Sales'],
    usersStarted: undefined,
    usersCompleted: undefined,
    avgQuizScore: undefined,
    avgQuizAttempts: undefined,
  },
  {
    key: '3',
    name: 'DAP Manager',
    productionStatus: 'archived',
    segment: ['All Employees'],
    usersStarted: 389,
    usersCompleted: 343,
    avgQuizScore: 90,
    avgQuizAttempts: 1.2,
  },
  {
    key: '4',
    name: 'WalkMe Workstation',
    productionStatus: 'draft',
    segment: ['HR', 'Sales'],
    usersStarted: undefined,
    usersCompleted: undefined,
    avgQuizScore: undefined,
    avgQuizAttempts: undefined,
  },
  {
    key: '5',
    name: 'Zendesk Fundamentals',
    productionStatus: 'published',
    segment: ['HR'],
    usersStarted: 879,
    usersCompleted: 400,
    avgQuizScore: 82,
    avgQuizAttempts: 0.8,
  },
  {
    key: '6',
    name: 'DAP Manager 2',
    productionStatus: 'published',
    segment: ['All Employees'],
    usersStarted: 120,
    usersCompleted: 70,
    avgQuizScore: 90,
    avgQuizAttempts: 1.2,
  },
  {
    key: '7',
    name: 'WalkMe Workstation',
    productionStatus: 'modified',
    segment: ['All Employees'],
    usersStarted: 500,
    usersCompleted: 421,
    avgQuizScore: 'No Quiz',
    avgQuizAttempts: undefined,
  },
  {
    key: '8',
    name: 'Zendesk Fundamentals',
    productionStatus: 'draft',
    segment: ['HR'],
    usersStarted: undefined,
    usersCompleted: undefined,
    avgQuizScore: undefined,
    avgQuizAttempts: undefined,
  },
];
