import React, { ReactElement, useEffect } from 'react';

import { useAppContext, ActionType as AppActionType } from '../../../providers/AppContext';
import {
  useUsersContext,
  defaultQueryOptions,
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
import { getColumns, ColumnType } from './tableData';
import ShownUsersIndicator from './ShownUsersIndicator';
import LoadMoreWrapper from './LoadMoreWrapper';
import classes from './style.module.scss';

// TODO: add cleanups to fetchUsers
export default function UsersScreen(): ReactElement {
  const [appState, appDispatch] = useAppContext();
  const {
    isUpdating,
    system,
    environment: { id: envId },
    dateRange: { from, to },
  } = appState;
  const [state, dispatch] = useUsersContext();
  const { isFetchingUsers, users, usersSearchValue } = state;
  const disableExport = isUpdating || isFetchingUsers || !users.length;
  const disableSearch = !users.length && !usersSearchValue.length;

  useEffect(() => {
    const options = { ...defaultQueryOptions };

    if (usersSearchValue.length) options.user_name = usersSearchValue;

    if (!isUpdating) fetchUsers(dispatch, envId, from, to, options);
  }, [dispatch, isUpdating, system, envId, from, to, usersSearchValue]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetUsers }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    appDispatch({ type: AppActionType.SetDateRange, dateRange });

  const onSearch = (searchValue: string) => {
    const options = {
      ...defaultQueryOptions,
      user_name: searchValue,
    };

    fetchUsers(dispatch, envId, from, to, options);

    dispatch({ type: ActionType.SetUsersSearchValue, usersSearchValue: searchValue });
  };

  const onHeaderCellClick = (col: ColumnType<any>) => {
    console.log('col', col);
  };

  return (
    <>
      <ScreenHeader
        title="Users"
        timeFilterProps={{ onDateRangeChange, dateRange: { from, to } }}
      />
      <WMCard className={classes['table-wrapper']}>
        <WMTable
          className={classes['users-table']}
          data={users}
          columns={getColumns(onHeaderCellClick)}
          loading={isUpdating || isFetchingUsers}
        >
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
              disabled={disableExport}
            />
            <SearchFilter
              placeholder="Search users"
              value={usersSearchValue}
              onSearch={onSearch}
              disabled={disableSearch}
            />
          </ControlsWrapper>
        </WMTable>
        <LoadMoreWrapper />
      </WMCard>
    </>
  );
}
