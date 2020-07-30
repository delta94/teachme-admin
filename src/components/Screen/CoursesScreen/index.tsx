import React, { ReactElement, useEffect, Key } from 'react';
import { Divider, ConfigProvider } from 'antd';

import { useAppContext } from '../../../providers/AppContext';
import { useCoursesContext, fetchCoursesData, ActionType } from '../../../providers/CoursesContext';
import { UICourse } from '../../../walkme/data';
import { IDateRange } from '../../../utils';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import { CreateButton } from '../../common/buttons';
import Icon, { IconType } from '../../common/Icon';
import ScreenHeader from '../../common/ScreenHeader';
// import { DropdownFilter } from '../../common/filters';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';

import ShownCoursesIndicator from './ShownCoursesIndicator';
import ProductionStatusActions from './ProductionStatusActions';
import DeleteCoursesButton from './DeleteCoursesButton';
import ExportCoursesButton from './ExportCoursesButton';
import SearchCoursesFilter from './SearchCoursesFilter';
// import { statuses, segments } from './utils';
import { columns } from './tableData';
import classes from './style.module.scss';

// TODO: add cleanups to fetchCoursesData
export default function CoursesScreen(): ReactElement {
  const [
    {
      isUpdating,
      environment: { id: envId },
      system,
    },
    appDispatch,
  ] = useAppContext();
  const [state, dispatch] = useCoursesContext();
  const {
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

  const customizeRenderEmpty = () => (
    <div className={classes['empty-state']}>
      <Icon className={classes['empty-icon']} type={IconType.EmptyCourse} />
      <h1>No courses yet</h1>
      <p>Start creating courses by clicking the button below</p>
      <CreateButton />
    </div>
  );

  const onDateRangeChange = (dateRange?: IDateRange) =>
    dispatch({ type: ActionType.SetDateRange, dateRange });

  const selectedRowsCount = selectedRows.length;

  return (
    <>
      <ScreenHeader
        title="Courses"
        timeFilterProps={{ onDateRangeChange, dateRange: { from, to } }}
      />
      <AnalyticsCharts summaryChartTitle="Users Started / Completed Courses" overview={overview} />
      <WMCard
        title="Courses"
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <WMTable
            rowSelection={{
              selectedRowKeys,
              onChange: onMultiSelectChange,
            }}
            data={filteredCourses}
            columns={columns}
            // onSortEnd={(sortedData) => setTableData(sortedData)}
          >
            <ShownCoursesIndicator />
            {/* <ControlsWrapper>
              <DropdownFilter label="Status" options={statuses} />
              <DropdownFilter label="Segments" options={segments} />
            </ControlsWrapper> */}
            <ControlsWrapper>
              {selectedRowsCount ? (
                <>
                  <ProductionStatusActions />
                  <DeleteCoursesButton />
                  <Divider className={classes['separator']} type="vertical" />
                </>
              ) : null}
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
