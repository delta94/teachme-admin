import React, { ReactElement, useEffect, useState, useRef } from 'react';

import { useAppContext, ActionType as AppActionType } from '../../../providers/AppContext';
import {
  useUsersContext,
  defaultQueryOptions,
  fetchUsers,
  exportUsers,
  ActionType,
  UsersOrder,
  UsersListQueryOptions,
} from '../../../providers/UsersContext';
import { IDateRange } from '../../../utils';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import ControlsWrapper from '../../common/ControlsWrapper';
import { SearchFilter } from '../../common/filters';
import { ExportButton } from '../../common/buttons';

import { sortByOptions } from './utils';
import { getColumns, ColumnType } from './tableData';
import ShownUsersIndicator from './ShownUsersIndicator';
import LoadMoreWrapper from './LoadMoreWrapper';
import FiltersToolbar from './FiltersToolbar';
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
  const [{ isFetchingUsers, users }, dispatch] = useUsersContext();
  const queryOptionsRef = useRef<UsersListQueryOptions>({ ...defaultQueryOptions });
  const queryOptions = queryOptionsRef.current;
  const disableExport = isUpdating || isFetchingUsers || !users.length;
  const disableSearch = !users.length && !queryOptions.user_name?.length;

  useEffect(() => {
    if (!isUpdating) fetchUsers(dispatch, envId, from, to, queryOptions);
  }, [dispatch, isUpdating, system, envId, from, to, queryOptions]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetUsers }), [dispatch]);

  const onDateRangeChange = (dateRange?: IDateRange) =>
    appDispatch({ type: AppActionType.SetDateRange, dateRange });

  const onSearch = (searchValue: string) => {
    queryOptions.user_name = searchValue;

    fetchUsers(dispatch, envId, from, to, queryOptions);
  };

  const [prevClassName, setPrevClassName] = useState<string>();

  const onHeaderCellClick = ({ className, dataIndex }: ColumnType<any>) => {
    // Sort by `UsersColumn` type
    queryOptions.sort_by = sortByOptions[dataIndex as keyof typeof sortByOptions];
    // Using `className` as flag to track click count
    // Cancel sort on last click
    if (className && className === prevClassName) {
      queryOptions.sort_by = defaultQueryOptions.sort_by;
    }
    // Sort by descending order on first click only
    if (!className) {
      queryOptions.sort_by_order = UsersOrder.DESC;
    } else {
      queryOptions.sort_by_order = UsersOrder.ASC;
    }
    // Keep previous `className` value to track next click
    setPrevClassName(className);

    fetchUsers(dispatch, envId, from, to, queryOptions);
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
          sortDirections={['descend', 'ascend']}
          loading={isUpdating || isFetchingUsers}
        >
          <ShownUsersIndicator showResults={Boolean(queryOptions.user_name)} />
          <ControlsWrapper>
            <ExportButton
              className={classes['export-btn']}
              onClick={() => exportUsers(dispatch, envId, from, to)}
              disabled={disableExport}
            />
            <SearchFilter
              placeholder="Search users"
              value={queryOptions.user_name}
              onSearch={onSearch}
              disabled={disableSearch}
            />
          </ControlsWrapper>
          <FiltersToolbar queryOptions={queryOptions} />
        </WMTable>
        <LoadMoreWrapper queryOptions={queryOptions} />
      </WMCard>
    </>
  );
}
