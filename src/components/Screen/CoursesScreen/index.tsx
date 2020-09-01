import React, {
  Key,
  useEffect,
  useCallback,
  MemoExoticComponent,
  useMemo,
  Dispatch,
  useState,
} from 'react';
import cc from 'classcat';
import { ConfigProvider, Divider } from 'antd';
import isEqual from 'lodash/isEqual';

import { ActionType as AppActionType, useAppContext } from '../../../providers/AppContext';
import {
  ActionType,
  fetchCoursesData,
  sortTable,
  useCoursesContext,
} from '../../../providers/CoursesContext';
import { UICourse } from '../../../walkme/data';
import { AllCoursesOverviewResponse } from '../../../walkme/models';
import { IDateRange } from '../../../utils';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import { CreateButton } from '../../common/buttons';
import ScreenHeader from '../../common/ScreenHeader';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import SearchEmptyState from '../../common/WMEmpty/SearchEmptyState';

import ShownCoursesIndicator from './ShownCoursesIndicator';
import ProductionStatusActions from './ProductionStatusActions';
import DeleteCoursesButton from './DeleteCoursesButton';
import ExportCoursesButton from './ExportCoursesButton';
import SearchCoursesFilter from './SearchCoursesFilter';
import CoursesEmptyState from './CoursesEmptyState';
import { getColumns } from './tableData';

import classes from './style.module.scss';

interface ICoursesScreenProps {
  isUpdating: boolean;
  envId: number;
  from: string;
  to: string;
  isFetchingCoursesData: boolean;
  overview: AllCoursesOverviewResponse;
  filteredCourses: Array<UICourse>;
  courses: Array<UICourse>;
  selectedRows: Array<UICourse>;
  selectedRowIds: Array<number>;
  isPublishingCourses: boolean;
  isArchivingCourses: boolean;
  isDeletingCourses: boolean;
  isExportingCourses: boolean;
  appDispatch: Dispatch<any>;
  dispatch: Dispatch<any>;
}

// TODO: add cleanups to fetchCoursesData
function CoursesScreen({
  isUpdating,
  envId,
  from,
  to,
  isFetchingCoursesData,
  overview,
  filteredCourses,
  courses,
  selectedRows,
  selectedRowIds,
  isPublishingCourses,
  isArchivingCourses,
  isDeletingCourses,
  isExportingCourses,
  appDispatch,
  dispatch,
}: ICoursesScreenProps) {
  const [areAllRowsSelected, setAreAllRowsSelected] = useState(false);

  const disableActions = useMemo(() => isUpdating || isFetchingCoursesData || !courses.length, [
    isUpdating,
    isFetchingCoursesData,
    courses.length,
  ]);
  useEffect(() => {
    if (!isUpdating) fetchCoursesData(dispatch, envId, from, to);
  }, [dispatch, isUpdating, envId, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourses }), [dispatch]);
  useEffect(() => () => setAreAllRowsSelected(false), []);

  const onDateRangeChange = useCallback(
    (dateRange?: IDateRange) => appDispatch({ type: AppActionType.SetDateRange, dateRange }),
    [appDispatch],
  );

  const onSortEnd = useCallback(
    (
      { oldIndex, newIndex }: { oldIndex: number; newIndex: number },
      courses: Array<UICourse>,
      selectedRowKeys?: Array<Key>,
    ) => {
      dispatch({ type: ActionType.UpdateCoursesTable, courses, selectedRowKeys });

      const courseId = courses[newIndex].id;
      sortTable(dispatch, courseId, oldIndex, newIndex);
    },
    [dispatch],
  );

  const selectedRowsCount = useMemo(() => selectedRows.length, [selectedRows.length]);

  const renderEmpty = useMemo(() => (disableActions ? CoursesEmptyState : SearchEmptyState), [
    disableActions,
  ]);

  const loading = useMemo(() => isUpdating || isFetchingCoursesData, [
    isUpdating,
    isFetchingCoursesData,
  ]);

  const handleRowSelection = useCallback(
    (record: UICourse) => {
      const doesExist = selectedRowIds.includes(record.id);
      const courses = doesExist
        ? selectedRows.filter(({ id }) => id !== record.id)
        : [...selectedRows, record];
      const rowIds = doesExist
        ? selectedRowIds.filter((id) => id !== record.id)
        : [...selectedRowIds, record.id];

      dispatch({ type: ActionType.SetSelectedRows, courses, selectedRowIds: rowIds });

      // onSelectAllRows behave as toggle therefor we set areAllRowsSelected to false
      // while areAllRowsSelected is true and the user deselect row
      areAllRowsSelected && setAreAllRowsSelected(false);
    },
    [areAllRowsSelected, selectedRows, selectedRowIds, dispatch],
  );

  const onSelectAllRows = useCallback(() => {
    const shouldSelectAll = !areAllRowsSelected;

    const courses = shouldSelectAll ? filteredCourses : [];
    const selectedRowIds = filteredCourses
      .map((course) => (shouldSelectAll ? course.id : null))
      .filter((c) => Boolean(c));

    dispatch({ type: ActionType.SetSelectedRows, courses, selectedRowIds });

    setAreAllRowsSelected(shouldSelectAll);
  }, [areAllRowsSelected, filteredCourses, dispatch]);

  const timeFilterProps = useMemo(() => ({ onDateRangeChange, dateRange: { from, to } }), [
    onDateRangeChange,
    from,
    to,
  ]);

  const columns = useMemo(() => getColumns(onSelectAllRows), [onSelectAllRows]);

  return (
    <>
      <ScreenHeader title="Courses" timeFilterProps={timeFilterProps} />
      <AnalyticsCharts
        summaryChartTitle="Users Started / Completed Courses"
        overview={overview as AllCoursesOverviewResponse}
        isLoading={isUpdating || isFetchingCoursesData}
      />
      <WMCard
        title="Courses"
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        {
          <ConfigProvider renderEmpty={renderEmpty}>
            <WMTable
              className={cc([
                classes['courses-table'],
                {
                  [classes['all-selected']]:
                    areAllRowsSelected &&
                    selectedRowsCount &&
                    selectedRowsCount === filteredCourses.length,
                  [classes['partial-selected']]: selectedRowsCount,
                },
              ])}
              data={filteredCourses}
              columns={columns}
              onSortEnd={onSortEnd}
              loading={loading}
              isStickyToolbarAndHeader
              rowClassName={(record) =>
                selectedRowIds.includes(record.id) ? classes['selected-row'] : ''
              }
              onRow={(record) => ({
                onClick: () => handleRowSelection(record),
              })}
            >
              <ShownCoursesIndicator
                isLoading={isUpdating || isFetchingCoursesData}
                courses={courses}
                filteredCourses={filteredCourses}
                selectedRows={selectedRows}
              />
              {/* <ControlsWrapper>
                <DropdownFilter label="Status" options={statuses} />
                <DropdownFilter label="Segments" options={segments} />
              </ControlsWrapper> */}
              <ControlsWrapper>
                {Boolean(selectedRowsCount) && (
                  <>
                    <ProductionStatusActions
                      selectedRows={selectedRows}
                      isPublishingCourses={isPublishingCourses}
                      isArchivingCourses={isArchivingCourses}
                      dispatch={dispatch}
                    />
                    <DeleteCoursesButton
                      selectedRows={selectedRows}
                      isDeletingCourses={isDeletingCourses}
                      dispatch={dispatch}
                    />
                    <Divider className={classes['separator']} type="vertical" />
                  </>
                )}
                <ExportCoursesButton
                  disabled={disableActions}
                  isExportingCourses={isExportingCourses}
                  dispatch={dispatch}
                />
                <SearchCoursesFilter
                  disabled={disableActions}
                  courses={courses}
                  dispatch={dispatch}
                />
                <CreateButton />
              </ControlsWrapper>
            </WMTable>
          </ConfigProvider>
        }
      </WMCard>
    </>
  );
}

const MemoizedComponent = React.memo(CoursesScreen, (oldProps, newProps) =>
  isEqual(oldProps, newProps),
);

function select(): ICoursesScreenProps {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [appState, appDispatch] = useAppContext();
  const {
    isUpdating,
    environment: { id: envId },
    dateRange: { from, to },
  } = appState;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useCoursesContext();
  const {
    isFetchingCoursesData,
    overview,
    filteredCourses,
    courses,
    selectedRows,
    selectedRowIds,
    isPublishingCourses,
    isArchivingCourses,
    isDeletingCourses,
    isExportingCourses,
  } = state;

  return {
    isUpdating,
    envId,
    from,
    to,
    isFetchingCoursesData,
    overview,
    filteredCourses,
    courses,
    selectedRows,
    selectedRowIds,
    isPublishingCourses,
    isArchivingCourses,
    isDeletingCourses,
    isExportingCourses,
    appDispatch,
    dispatch,
  };
}

function connectToContext(
  WrappedComponent: MemoExoticComponent<any>,
  select: () => ICoursesScreenProps,
) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const selectors = select();
    return <WrappedComponent {...selectors} {...props} />;
  };
}

export default connectToContext(MemoizedComponent, select);
