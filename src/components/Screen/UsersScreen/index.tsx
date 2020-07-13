import React, { ReactElement, useState } from 'react';

import { usersMockData } from '../../../constants/mocks/users-mock';
import { data, columns } from '../../../constants/mocks/tableMockUsersData';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import ControlsWrapper from '../../common/ControlsWrapper';
import DropdownFilter from '../../common/filters/DropdownFilter';
import { IWMDropdownOption } from '../../common/WMDropdown';
import SearchFilter from '../../common/filters/SearchFilter';
import ExportButton from '../../common/buttons/ExportButton';

import classes from './style.module.scss';

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
  { id: 0, value: 'All Courses' },
  { id: 1, value: 'Course 1' },
  { id: 2, value: 'Course 2' },
  { id: 3, value: 'Course 3' },
  { id: 4, value: 'Course 4' },
  { id: 5, value: 'Course 5' },
];

const statuses: IWMDropdownOption[] = [
  { id: 0, value: 'All' },
  { id: 1, value: 'Completed' },
  { id: 2, value: 'Did not complete' },
];

const results: IWMDropdownOption[] = [
  { id: 0, value: 'All Results' },
  { id: 1, value: 'Passed' },
  { id: 2, value: 'Failed' },
  { id: 3, value: 'Did not submit' },
  { id: 4, value: 'No quiz' },
];

export default function UsersScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  const [tableData, setTableData] = useState(data);

  const onSearch = (searchValue: string) => {
    const newTableData = data.filter((user) =>
      user.user.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setTableData(newTableData);
  };

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <WMCard title={`${tableData.length} ${usersTable.title}`}>
        <WMTable data={tableData as Array<IUserData>} columns={columns}>
          <ControlsWrapper>
            <DropdownFilter label="Course Name" options={courses} />
            <DropdownFilter label="Completed" options={statuses} />
            <DropdownFilter label="Quiz Results" options={results} />
          </ControlsWrapper>
          <ControlsWrapper>
            <ExportButton className={classes['export-btn']} />
            <SearchFilter placeholder="Search users" onSearch={onSearch} />
          </ControlsWrapper>
        </WMTable>
      </WMCard>
    </>
  );
}
