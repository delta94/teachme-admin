import React, { ReactElement } from 'react';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import { usersMockData } from '../../../constants/mocks/users-mock';
import { data as tableData, columns } from '../../../mocks/tableMockUsersData';
import ScreenHeader from '../../common/ScreenHeader';
import CoursesFilter from '../../common/filters/CoursesFilter';
import StatusCourseFilter from '../../common/filters/StatusCourseFilter';
import QuizResultsFilter from '../../common/filters/QuizResultsFilter';
import classes from './style.module.scss';
import SearchUser from '../../common/filters/SearchUser';

export default function UsersScreen(): ReactElement {
  const { title: mainTitle, usersTable } = usersMockData;
  return (
    <>
      <ScreenHeader title={mainTitle} />
      <WMCard title={`${tableData.length} ${usersTable.title}`}>
        <div className={classes["users-sub-bar"]}>
          <div className={classes["users-filter"]}>
            <CoursesFilter />
            <StatusCourseFilter />
            <QuizResultsFilter />
          </div>
          <div className={classes["users-search"]}>
            <SearchUser />
          </div>
        </div>
        <WMTable data={tableData} columns={columns} />
      </WMCard>
    </>
  );
}
