import React, { ReactElement, useEffect } from 'react';

import { useUsersContext, fetchUsers, ActionType } from '../../../providers/UsersContext';
import { IDateRange } from '../../../utils';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import ControlsWrapper from '../../common/ControlsWrapper';
import {
  // DropdownFilter,
  SearchFilter,
} from '../../common/filters';
import { ExportButton } from '../../common/buttons';

// import { courses, statuses, results } from './utils';
import { columns } from './tableData';
import classes from './style.module.scss';

export default function UsersScreen(): ReactElement {
  const [state, dispatch] = useUsersContext();
  const {
    dateRange: { from, to },
    users,
    filteredUsers,
    totals_unique_users,
    usersSearchValue,
  } = state;

  useEffect(() => {
    fetchUsers(dispatch, 0, from, to);
  }, [dispatch, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetUsers }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    dispatch({ type: ActionType.SetDateRange, dateRange });

  const onSearch = (searchValue: string) => {
    const newUsersList = users.filter(({ id }) =>
      id.toLowerCase().includes(searchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetUsersSearchValue,
      usersSearchValue: searchValue,
      users: newUsersList,
    });
  };

  return (
    <>
      <ScreenHeader
        title="Users"
        timeFilterProps={{ onDateRangeChange, dateRange: { from, to } }}
      />
      <WMCard title={`${totals_unique_users} Users`}>
        <WMTable className={classes['users-table']} data={filteredUsers} columns={columns}>
          <ControlsWrapper>
            {/* <DropdownFilter label="Course Name" options={courses} />
            <DropdownFilter label="Completed" options={statuses} />
            <DropdownFilter label="Quiz Results" options={results} /> */}
          </ControlsWrapper>
          <ControlsWrapper>
            <ExportButton className={classes['export-btn']} />
            <SearchFilter placeholder="Search users" value={usersSearchValue} onSearch={onSearch} />
          </ControlsWrapper>
        </WMTable>
      </WMCard>
    </>
  );
}
