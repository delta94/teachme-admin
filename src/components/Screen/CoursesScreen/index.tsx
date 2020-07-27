import React, { ReactElement, useState, useEffect, Key } from 'react';
import { Divider, message, ConfigProvider } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { coursesMockData } from '../../../constants/mocks/courses-screen';
import { useCoursesContext, fetchCourseList, ActionType } from '../../../providers/CoursesContext';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import { ExportButton, CreateButton } from '../../common/buttons';
import Icon, { IconType } from '../../common/Icon';
import ScreenHeader from '../../common/ScreenHeader';
import { DropdownFilter, SearchFilter } from '../../common/filters';
import WMButton from '../../common/WMButton';
import WMCard from '../../common/WMCard';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMTable from '../../common/WMTable';
import {
  DeleteCourseDialog,
  PublishToEnvironmentDialog,
  ExportToCSVDialog,
} from '../../common/dialogs';

import { mockDates, statuses, segments, prodStatuses } from './utils';
import { columns } from './tableData';
import classes from './style.module.scss';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, analytics } = coursesMockData;
  const { from, to } = mockDates;

  const [state, dispatch] = useCoursesContext();
  const { courses, filteredCourses, selectedRows, selectedRowKeys } = state;

  useEffect(() => {
    fetchCourseList(dispatch, 0, from, to);

    return () => dispatch({ type: ActionType.ResetCourses });
  }, [dispatch, from, to]);

  const onSearch = (searchValue: string) => {
    const newCourseList = courses.filter(({ title }) =>
      title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    dispatch({
      type: ActionType.SetCoursesSearchValue,
      coursesSearchValue: searchValue,
      courses: newCourseList,
    });
  };

  // Dialogs
  const [showPublish, setShowPublish] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);

  const onProdStatusChange = (selected: IWMDropdownOption) => {
    if (selected.value === 'Published') setShowPublish(true);
    else message.info(`Production status was changed to ${selected.value}`);
  };

  const onMultiSelectChange = (selectedRowKeys: Array<Key>) => {
    dispatch({
      type: ActionType.SetSelectedRows,
      courses: courses.filter((row) => selectedRowKeys.includes(row.id)),
      selectedRowKeys,
    });
  };

  const customizeRenderEmpty = () => (
    <div className={classes['empty-state']}>
      <Icon className={classes['empty-icon']} type={IconType.EmptyCourse} />
      <h1>No courses yet</h1>
      <p>Start creating courses by clicking the button below</p>
      <CreateButton />
    </div>
  );

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <AnalyticsCharts data={analytics} />
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
            <ControlsWrapper>
              {/* <DropdownFilter label="Status" options={statuses} />
              <DropdownFilter label="Segments" options={segments} /> */}
            </ControlsWrapper>
            <ControlsWrapper>
              {selectedRowKeys?.length ? (
                <>
                  <WMDropdown options={prodStatuses} onSelectedChange={onProdStatusChange}>
                    <WMButton className={classes['prod-status']}>
                      Change Status
                      <DownOutlined />
                    </WMButton>
                  </WMDropdown>
                  <WMButton
                    icon={<Icon type={IconType.Delete} />}
                    onClick={() => setShowDeleteCourse(true)}
                  />
                  <Divider className={classes['separator']} type="vertical" />
                </>
              ) : null}
              <ExportButton onClick={() => setShowExport(true)} />
              <SearchFilter
                className={classes['search']}
                placeholder="Search course name"
                onSearch={onSearch}
              />
              <CreateButton />
            </ControlsWrapper>
          </WMTable>
        </ConfigProvider>
      </WMCard>
      {/* Dialogs */}
      <PublishToEnvironmentDialog
        open={showPublish}
        onCancel={() => setShowPublish(false)}
        onConfirm={() => {
          setShowPublish(false);
          message.info(`Production status changed to Published`);
        }}
      />
      <DeleteCourseDialog
        open={showDeleteCourse}
        onCancel={() => setShowDeleteCourse(false)}
        onConfirm={() => {
          setShowDeleteCourse(false);
          message.info('Deleting courses');
        }}
      />
      <ExportToCSVDialog
        open={showExport}
        onCancel={() => setShowExport(false)}
        onConfirm={() => {
          setShowExport(false);
          message.info('Exporting file');
        }}
      />
    </>
  );
}
