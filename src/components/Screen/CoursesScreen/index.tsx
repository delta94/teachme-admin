import React, { ReactElement, useState, useEffect, Key } from 'react';
import { Divider, message, ConfigProvider } from 'antd';

import { coursesMockData } from '../../../constants/mocks/courses-screen';
import {
  useCoursesContext,
  fetchCoursesData,
  ActionType,
  exportCourses,
  deleteCourses,
} from '../../../providers/CoursesContext';
import { UICourse, PublishStatus } from '../../../walkme/data';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import { ExportButton, CreateButton } from '../../common/buttons';
import Icon, { IconType } from '../../common/Icon';
import ScreenHeader from '../../common/ScreenHeader';
import { DropdownFilter, SearchFilter } from '../../common/filters';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';
import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import {
  DeleteCourseDialog,
  CantDeleteDialog, // TODO: remove 'delete' button from this dialog, disabled for now
  PublishToEnvironmentDialog,
  ExportToCSVDialog,
} from '../../common/dialogs';

// import { statuses, segments } from './utils';
import { columns } from './tableData';
import classes from './style.module.scss';

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, analytics } = coursesMockData;

  const [state, dispatch] = useCoursesContext();
  const {
    dateRange: { from, to },
    courses,
    filteredCourses,
    selectedRows,
    selectedRowKeys,
  } = state;

  useEffect(() => {
    fetchCoursesData(dispatch, 0, from, to);
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

  // Unmount only
  useEffect(() => () => dispatch({ type: ActionType.ResetCourses }), [dispatch]);

  // Dialogs
  const [showPublish, setShowPublish] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [showCantDeleteCourse, setShowCantDeleteCourse] = useState(false);

  const checkCantDelete = () =>
    selectedRows.some((course) => course.publishStatus === PublishStatus.Published);

  const onDeleteCourse = () => {
    if (checkCantDelete()) setShowCantDeleteCourse(true);
    else setShowDeleteCourse(true);
  };

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

  const selectedRowsCount = selectedRows.length;
  const shownCoursesCount = filteredCourses.length;

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
            <div className={classes['showing']}>
              {courses.length ? (
                <>
                  {selectedRowsCount
                    ? `${selectedRowsCount} course${selectedRowsCount > 1 ? 's' : ''} selected`
                    : `Showing ${shownCoursesCount} course${shownCoursesCount > 1 ? 's' : ''}`}
                </>
              ) : null}
            </div>
            {/* <ControlsWrapper>
              <DropdownFilter label="Status" options={statuses} />
              <DropdownFilter label="Segments" options={segments} />
            </ControlsWrapper> */}
            <ControlsWrapper>
              {selectedRowsCount ? (
                <>
                  <div className={classes['prod-status-btns']}>
                    <WMButton variant={ButtonVariantEnum.Link} onClick={() => setShowPublish(true)}>
                      Publish
                    </WMButton>
                    <WMButton
                      variant={ButtonVariantEnum.Link}
                      onClick={() => message.info(`Production status was changed to archive`)}
                    >
                      Archive
                    </WMButton>
                    <WMButton
                      variant={ButtonVariantEnum.Link}
                      onClick={() => message.info(`Production status was changed to draft`)}
                    >
                      Mark as Draft
                    </WMButton>
                  </div>
                  <WMButton
                    className={classes['delete-btn']}
                    icon={<Icon type={IconType.Delete} />}
                    onClick={onDeleteCourse}
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
        courses={selectedRows}
        open={showDeleteCourse}
        onCancel={() => setShowDeleteCourse(false)}
        onConfirm={async () => {
          setShowDeleteCourse(false);
          await deleteCourses(dispatch, selectedRows);
          fetchCoursesData(dispatch, 0, from, to);
        }}
      />
      <CantDeleteDialog
        open={showCantDeleteCourse}
        onCancel={() => setShowCantDeleteCourse(false)}
        onConfirm={() => setShowCantDeleteCourse(false)}
      />
      <ExportToCSVDialog
        coursesCount={courses.length}
        open={showExport}
        onCancel={() => setShowExport(false)}
        onConfirm={() => {
          setShowExport(false);
          exportCourses(dispatch, 0, from, to);
        }}
      />
    </>
  );
}
