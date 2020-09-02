import React, { ReactElement, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { ConfigProvider } from 'antd';

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
import { DataEmptyState, SearchEmptyState } from '../../common/WMEmpty';
import LastUpdated from '../../common/LastUpdated';

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
  const [
    { isFetchingUsers, users, isExportingUsers, total_rows, totals_unique_users },
    dispatch,
  ] = useUsersContext();
  const queryOptionsRef = useRef<UsersListQueryOptions>({ ...defaultQueryOptions });
  const queryOptions = queryOptionsRef.current;
  const disableExport = isUpdating || isFetchingUsers || !users.length;
  const disableSearch = !users.length && !queryOptions.user_name?.length;

  useEffect(() => {
    if (!isUpdating) fetchUsers(dispatch, envId, from, to, queryOptions);
  }, [dispatch, isUpdating, system, envId, from, to, queryOptions]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetUsers }), [dispatch]);

  const onDateRangeChange = useCallback(
    (dateRange?: IDateRange) => appDispatch({ type: AppActionType.SetDateRange, dateRange }),
    [appDispatch],
  );

  const onSearch = useCallback(
    (searchValue: string) => {
      queryOptions.user_name = searchValue;

      fetchUsers(dispatch, envId, from, to, queryOptions);
    },
    [dispatch, envId, from, to, queryOptions],
  );

  const [prevClassName, setPrevClassName] = useState<string>();

  const onHeaderCellClick = useCallback(
    ({ className, dataIndex }: ColumnType<any>) => {
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
    },
    [prevClassName, dispatch, envId, from, to, queryOptions],
  );

  const exportUsersOnClick = useCallback(() => {
    exportUsers(dispatch, envId, from, to, queryOptions);
  }, [dispatch, envId, from, to, queryOptions]);

  const timeFilterProps = useMemo(() => ({ onDateRangeChange, dateRange: { from, to } }), [
    onDateRangeChange,
    from,
    to,
  ]);

  const columns = useMemo(() => getColumns(onHeaderCellClick), [onHeaderCellClick]);

  return (
    <div className={classes['users-screen']}>
      <ScreenHeader
        title={
          <div className={classes['users-title']}>
            Users <LastUpdated />
          </div>
        }
        timeFilterProps={timeFilterProps}
      />
      <WMCard className={classes['table-wrapper']}>
        <ConfigProvider renderEmpty={disableSearch ? DataEmptyState : SearchEmptyState}>
          <WMTable
            className={classes['users-table']}
            data={users}
            columns={columns}
            sortDirections={['descend', 'ascend']}
            showSorterTooltip={false}
            scroll={{ y: 500 }} // Just an arbitrary value to enable scrolling and is overwritten by css
            loading={isUpdating || isFetchingUsers}
          >
            <ShownUsersIndicator
              showResults={Boolean(queryOptions.user_name)}
              isFetchingUsers={isFetchingUsers}
              totals_unique_users={totals_unique_users}
              total_rows={total_rows}
            />
            <ControlsWrapper>
              <ExportButton
                className={classes['export-btn']}
                onClick={exportUsersOnClick}
                disabled={disableExport}
                loading={isExportingUsers}
              />
              <SearchFilter
                placeholder="Search users"
                value={queryOptions.user_name}
                onSearch={onSearch}
                disabled={disableSearch}
              />
            </ControlsWrapper>
            <FiltersToolbar
              queryOptions={queryOptions}
              isFetchingUsers={isFetchingUsers}
              isUpdating={isUpdating}
              envId={envId}
              from={from}
              to={to}
              dispatch={dispatch}
            />
          </WMTable>
        </ConfigProvider>
        <LoadMoreWrapper
          queryOptions={queryOptions}
          isFetchingUsers={isFetchingUsers}
          users={users}
          total_rows={total_rows}
          dispatch={dispatch}
          envId={envId}
          from={from}
          to={to}
        />
      </WMCard>
    </div>
  );
}
