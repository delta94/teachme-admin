import React, { ReactElement, useEffect, Key } from 'react';
import { Divider, ConfigProvider } from 'antd';

import { useAppContext } from '../../../providers/AppContext';
import {
  useCoursesContext,
  fetchCoursesData,
  sortTable,
  ActionType,
} from '../../../providers/CoursesContext';
import { UICourse } from '../../../walkme/data';
import { AllCoursesOverviewResponse } from '../../../walkme/models';
import { IDateRange } from '../../../utils';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import { CreateButton } from '../../common/buttons';
import ScreenHeader from '../../common/ScreenHeader';
// import { DropdownFilter } from '../../common/filters';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';

import ShownCoursesIndicator from './ShownCoursesIndicator';
import ProductionStatusActions from './ProductionStatusActions';
import DeleteCoursesButton from './DeleteCoursesButton';
import ExportCoursesButton from './ExportCoursesButton';
import SearchCoursesFilter from './SearchCoursesFilter';
import CoursesEmptyState from './CoursesEmptyState';
// import { statuses, segments } from './utils';
import { columns } from './tableData';
import classes from './style.module.scss';

// TODO: add cleanups to fetchCoursesData
export default function CoursesScreen(): ReactElement {
  const [appState] = useAppContext();
  const {
    isUpdating,
    environment: { id: envId },
    system,
  } = appState;
  const [state, dispatch] = useCoursesContext();
  const {
    isFetchingCoursesData,
    dateRange: { from, to },
    overview,
    filteredCourses,
    selectedRows,
    selectedRowKeys,
  } = state;

  useEffect(() => {
    if (!isUpdating) fetchCoursesData(dispatch, envId, from, to);
  }, [dispatch, isUpdating, envId, system, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourses }), [dispatch]);

  const onMultiSelectChange = (selectedRowKeys: Array<Key>, selectedRows: Array<UICourse>) =>
    dispatch({
      type: ActionType.SetSelectedRows,
      courses: selectedRows,
      selectedRowKeys,
    });

  const onDateRangeChange = (dateRange?: IDateRange) =>
    dispatch({ type: ActionType.SetDateRange, dateRange });

  const onSortEnd = (
    { oldIndex, newIndex }: { oldIndex: number; newIndex: number },
    courses: Array<UICourse>,
    selectedRowKeys?: Array<Key>,
  ) => {
    dispatch({ type: ActionType.UpdateCoursesTable, courses, selectedRowKeys });

    const courseId = courses[newIndex].id;
    sortTable(dispatch, courseId, oldIndex, newIndex);
  };

  const selectedRowsCount = selectedRows.length;

  return (
    <>
      <ScreenHeader
        title="Courses"
        timeFilterProps={{ onDateRangeChange, dateRange: { from, to } }}
      />
      <AnalyticsCharts
        summaryChartTitle="Users Started / Completed Courses"
        overview={overview as AllCoursesOverviewResponse}
        isLoading={isUpdating || isFetchingCoursesData}
      />
      <WMCard
        title="Courses"
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        <ConfigProvider
          renderEmpty={() => <CoursesEmptyState isLoading={isUpdating || isFetchingCoursesData} />}
        >
          <WMTable
            rowSelection={{
              selectedRowKeys,
              onChange: onMultiSelectChange,
            }}
            data={filteredCourses}
            columns={columns}
            onSortEnd={onSortEnd}
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
              <ExportCoursesButton />
              <SearchCoursesFilter />
              <CreateButton />
            </ControlsWrapper>
          </WMTable>
        </ConfigProvider>
      </WMCard>
    </>
  );
}
