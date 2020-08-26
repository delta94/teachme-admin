import React, { Key, useEffect, useCallback, MemoExoticComponent, useMemo, Dispatch } from 'react';
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
  selectedRowKeys: Array<Key>;
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
  selectedRowKeys,
  appDispatch,
  dispatch,
}: ICoursesScreenProps) {
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

  const onMultiSelectChange = useCallback(
    (selectedRowKeys: Array<Key>, selectedRows: Array<UICourse>) =>
      dispatch({
        type: ActionType.SetSelectedRows,
        courses: selectedRows,
        selectedRowKeys,
      }),
    [dispatch],
  );

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

  const dateRange = useMemo(
    () => ({
      from,
      to,
    }),
    [from, to],
  );
  const selectedRowsCount = useMemo(() => selectedRows.length, [selectedRows.length]);
  const renderEmpty = useMemo(() => (disableActions ? CoursesEmptyState : SearchEmptyState), [
    disableActions,
  ]);
  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: onMultiSelectChange,
    }),
    [selectedRowKeys, onMultiSelectChange],
  );
  const loading = useMemo(() => isUpdating || isFetchingCoursesData, [
    isUpdating,
    isFetchingCoursesData,
  ]);

  return (
    <>
      <ScreenHeader title="Courses" timeFilterProps={{ onDateRangeChange, dateRange }} />
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
              rowSelection={rowSelection}
              data={filteredCourses}
              columns={getColumns(dispatch, selectedRowKeys)}
              onSortEnd={onSortEnd}
              loading={loading}
              isStickyToolbarAndHeader
            >
              <ShownCoursesIndicator isLoading={isUpdating || isFetchingCoursesData} />
              {/* <ControlsWrapper>
                <DropdownFilter label="Status" options={statuses} />
                <DropdownFilter label="Segments" options={segments} />
              </ControlsWrapper> */}
              <ControlsWrapper>
                {Boolean(selectedRowsCount) && (
                  <>
                    <ProductionStatusActions />
                    <DeleteCoursesButton />
                    <Divider className={classes['separator']} type="vertical" />
                  </>
                )}
                <ExportCoursesButton disabled={disableActions} />
                <SearchCoursesFilter disabled={disableActions} />
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
    selectedRowKeys,
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
    selectedRowKeys,
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
