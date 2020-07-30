import React, { ReactElement, useEffect } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import {
  useUsersContext,
  fetchUsers,
  exportUsers,
  ActionType,
} from '../../../providers/UsersContext';
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
import ShownUsersIndicator from './ShownUsersIndicator';
import classes from './style.module.scss';

export default function UsersScreen(): ReactElement {
  const [appState] = useAppContext();
  const {
    system,
    environment: { id: envId },
  } = appState;
  const [state, dispatch] = useUsersContext();
  const {
    dateRange: { from, to },
    users,
    filteredUsers,
    usersSearchValue,
  } = state;

  useEffect(() => {
    fetchUsers(dispatch, envId, from, to);
  }, [system, envId, dispatch, from, to]);

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
      <WMCard className={classes['table-wrapper']}>
        <WMTable className={classes['users-table']} data={filteredUsers} columns={columns}>
          <ShownUsersIndicator />
          {/* <ControlsWrapper>
            <DropdownFilter label="Course Name" options={courses} />
            <DropdownFilter label="Completed" options={statuses} />
            <DropdownFilter label="Quiz Results" options={results} />
          </ControlsWrapper> */}
          <ControlsWrapper>
            <ExportButton
              className={classes['export-btn']}
              onClick={() => exportUsers(dispatch, envId, from, to)}
            />
            <SearchFilter placeholder="Search users" value={usersSearchValue} onSearch={onSearch} />
          </ControlsWrapper>
        </WMTable>
      </WMCard>
    </>
  );
}
