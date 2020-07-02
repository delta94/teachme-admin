import React, { ReactElement } from 'react';

import { usersMockData } from '../../../constants/mocks/users-mock';
import { data as tableData, columns } from '../../../constants/mocks/tableMockUsersData';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import DropdownFilter from '../../common/filters/DropdownFilter';
import { IWMDropdownOption } from '../../common/WMDropdown';

interface IUserData {
  key: string;
  user: string;
  courseName: string;
  started: string;
  completed: string;
  timeToComplete: string;
  quizResult: number;
  noOfQuizAttempts: number;
}

const courses: IWMDropdownOption[] = [
  { id: 0, text: 'All Courses' },
  { id: 1, text: 'Course 1' },
  { id: 2, text: 'Course 2' },
  { id: 3, text: 'Course 3' },
  { id: 4, text: 'Course 4' },
  { id: 5, text: 'Course 5' },
];

const statuses: IWMDropdownOption[] = [
  { id: 0, text: 'All' },
  { id: 1, text: 'Completed' },
  { id: 2, text: 'Did not complete' },
];

const results: IWMDropdownOption[] = [
  { id: 0, text: 'All Results' },
  { id: 1, text: 'Passed' },
  { id: 2, text: 'Failed' },
  { id: 3, text: 'Did not submit' },
  { id: 4, text: 'No quiz' },
];

export default function UsersScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <WMCard title={`${tableData.length} ${usersTable.title}`}>
        <WMTable data={tableData as Array<IUserData>} columns={columns}>
          <DropdownFilter label="Course Name" options={courses} />
          <DropdownFilter label="Completed" options={statuses} />
          <DropdownFilter label="Quiz Results" options={results} />
        </WMTable>
      </WMCard>
    </>
  );
}
