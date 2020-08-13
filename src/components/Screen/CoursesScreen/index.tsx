import React, { Key, ReactElement, useEffect, useState } from 'react';
import { ConfigProvider, Divider } from 'antd';

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
  const [appState, appDispatch] = useAppContext();
  const {
    isUpdating,
    environment: { id: envId },
    dateRange: { from, to },
  } = appState;
  const [state, dispatch] = useCoursesContext();
  const {
    isFetchingCoursesData,
    overview,
    filteredCourses,
    courses,
    selectedRows,
    selectedRowKeys,
  } = state;
  const disableActions = isUpdating || isFetchingCoursesData || !courses.length;
  const [hoverRowHeight, setHoverRowHeight] = useState(0);

  useEffect(() => {
    if (!isUpdating) fetchCoursesData(dispatch, envId, from, to);
  }, [dispatch, isUpdating, envId, from, to]);

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourses }), [dispatch]);

  const onMultiSelectChange = (selectedRowKeys: Array<Key>, selectedRows: Array<UICourse>) =>
    dispatch({
      type: ActionType.SetSelectedRows,
      courses: selectedRows,
      selectedRowKeys,
    });

  const onDateRangeChange = (dateRange?: IDateRange) =>
    appDispatch({ type: AppActionType.SetDateRange, dateRange });

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
        <ConfigProvider renderEmpty={CoursesEmptyState}>
          <WMTable
            rowSelection={{
              selectedRowKeys,
              onChange: onMultiSelectChange,
            }}
            data={filteredCourses}
            columns={columns}
            onSortEnd={onSortEnd}
            loading={isUpdating || isFetchingCoursesData}
            isStickyToolbarAndHeader
            onRow={() => ({
              onMouseEnter: (e: any) => {
                setHoverRowHeight(e.target.getBoundingClientRect().height);
              },
            })}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style={{ '--hover-row-height': `${hoverRowHeight}px` }}
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
      </WMCard>
    </>
  );
}
