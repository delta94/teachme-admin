import React, { ReactElement, useEffect, useState, useRef, useCallback } from 'react';
import cc from 'classcat';

import { getCoursesMetadata } from '../../../walkme/screens/users';
import { CourseMetadata } from '../../../walkme/models';
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
import WMSelect, { WMSelectModeType } from '../../common/WMSelect';
import FormGroup from '../../common/FormGroup';
import ScreenHeader from '../../common/ScreenHeader';
import ControlsWrapper from '../../common/ControlsWrapper';
import { SearchFilter } from '../../common/filters';
import { ExportButton } from '../../common/buttons';

import { sortByOptions, statusesOptions, resultsOptions } from './utils';
import { getColumns, ColumnType } from './tableData';
import ShownUsersIndicator from './ShownUsersIndicator';
import LoadMoreWrapper from './LoadMoreWrapper';
import classes from './style.module.scss';

const parseCoursesMetadata = (courses: CourseMetadata[]): { label: string; value: string }[] =>
  [{ label: 'All', value: 'All' }].concat(
    courses.map(({ title }) => ({ label: title, value: title })),
  );

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

  const [coursesOptions, setCoursesOptions] = useState<any[]>([]);
  const [isFetchingOptions, setIsFetchingOptions] = useState<boolean>(true);

  const getCoursesOptions = useCallback(async () => {
    try {
      const coursesMetadata = await getCoursesMetadata(envId);
      const options = parseCoursesMetadata(coursesMetadata);

      setCoursesOptions(options);
      setIsFetchingOptions(false);
    } catch (error) {
      console.error(error);
      setIsFetchingOptions(false);
    }
  }, [envId]);

  useEffect(() => {
    getCoursesOptions();

    return () => {
      setCoursesOptions([]);
      setIsFetchingOptions(true);
    };
  }, [getCoursesOptions]);

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
          <ControlsWrapper className={classes['filters']}>
            <FormGroup className={classes['filter-wrapper']} label="Course Name:">
              <WMSelect
                className={cc([classes['select-filter'], classes['multi']])}
                mode={WMSelectModeType.Multiple}
                showArrow
                optionFilterProp="label"
                defaultValue="All"
                options={coursesOptions}
                loading={isFetchingOptions}
                disabled={!coursesOptions.length && !isFetchingOptions}
              />
            </FormGroup>
            <FormGroup className={classes['filter-wrapper']} label="Completed:">
              <WMSelect
                className={classes['select-filter']}
                optionFilterProp="label"
                defaultValue={statusesOptions[0].value}
                options={statusesOptions}
              />
            </FormGroup>
            <FormGroup className={classes['filter-wrapper']} label="Quiz Results:">
              <WMSelect
                className={classes['select-filter']}
                optionFilterProp="label"
                defaultValue={resultsOptions[0].value}
                options={resultsOptions}
              />
            </FormGroup>
          </ControlsWrapper>
        </WMTable>
        <LoadMoreWrapper queryOptions={queryOptions} />
      </WMCard>
    </>
  );
}
