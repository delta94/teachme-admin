import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { Divider, message } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

import { useAppContext } from '../../../providers/AppContext';
import { coursesMockData } from '../../../constants/mocks/courses-screen';

import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import ExportButton from '../../common/buttons/ExportButton';
import Icon, { IconType } from '../../common/Icon';
import ScreenHeader from '../../common/ScreenHeader';
import SearchFilter from '../../common/filters/SearchFilter';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';
import WMCard from '../../common/WMCard';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMTable from '../../common/WMTable';
import WMTag from '../../common/WMTag';
// dialogs
import DeleteCourseDialog from '../../common/dialogs/DeleteCourseDialog';
import DialogPublishToEnvironment from '../../common/dialogs/PublishToEnvironmentDialog';
import ExportToCSVDialog from '../../common/dialogs/ExportToCSVDialog';

import classes from './style.module.scss';

interface ICourseData {
  key: string;
  name: {
    value: string;
    id: number;
  };
  productionStatus: string;
  segment: Array<string>;
  usersStarted: number;
  usersCompleted: number;
  avgQuizScore: number;
  avgQuizAttempts: number;
}

const statuses: IWMDropdownOption[] = [
  { id: 0, value: 'All Status' },
  { id: 1, value: 'Published' },
  { id: 2, value: 'Modified' },
  { id: 3, value: 'Draft' },
  { id: 4, value: 'Archived' },
];

const segments: IWMDropdownOption[] = [
  { id: 0, value: 'All Segments' },
  { id: 1, value: 'All Employees' },
  { id: 2, value: 'HR' },
  { id: 3, value: 'Sales' },
  { id: 4, value: 'Product' },
  { id: 5, value: 'R&D' },
];

const prodStatuses: IWMDropdownOption[] = [
  {
    id: 0,
    value: 'Published',
    label: <WMTag value="Published" color="green" className={classes['dropdown-tag']} />,
  },
  {
    id: 1,
    value: 'Draft',
    label: <WMTag value="Draft" color="orange" className={classes['dropdown-tag']} />,
  },
  {
    id: 2,
    value: 'Archived',
    label: <WMTag value="Archived" color="gray" className={classes['dropdown-tag']} />,
  },
];

export default function CoursesScreen(): ReactElement {
  const {
    title: mainTitle,
    analytics,
    CoursesTable: { title: CoursesTableTitle, table },
  } = coursesMockData;

  const [tableData, setTableData] = useState(table.data);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([]);
  const [selectedRows, setSelectedRows] = useState<Array<any>>([]);

  // dialogs
  const [showPublish, setShowPublish] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);

  const onSearch = (searchValue: string) => {
    const newTableData = table.data.filter((course) =>
      course.name.value.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setTableData(newTableData);
  };

  const onProdStatusChange = (selected: IWMDropdownOption) => {
    if (selected.value === 'Published') setShowPublish(true);
    else message.info(`Production status was changed to ${selected.value}`);
  };

  const onMultiSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(table.data.filter((row) => selectedRowKeys.includes(row.key)));
  };

  const hasSelected = !!selectedRowKeys.length;

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <AnalyticsCharts data={analytics} />
      <WMCard
        title={`${tableData.length} ${CoursesTableTitle}`}
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        <WMTable
          rowSelection={{
            selectedRowKeys,
            onChange: onMultiSelectChange,
          }}
          data={tableData as Array<ICourseData>}
          columns={table.columns}
          onSortEnd={(sortedData) => setTableData(sortedData)}
        >
          <ControlsWrapper>
            {/* <DropdownFilter label="Status" options={statuses} />
            <DropdownFilter label="Segments" options={segments} /> */}
          </ControlsWrapper>
          <ControlsWrapper>
            <WMDropdown
              options={prodStatuses}
              onSelectedChange={onProdStatusChange}
              disabled={!hasSelected}
            >
              <WMButton className={classes['prod-status']}>
                Change Status
                <DownOutlined />
              </WMButton>
            </WMDropdown>
            <Divider className={classes['separator']} type="vertical" />
            <WMButton
              className={classes['delete-btn']}
              icon={<Icon type={IconType.Delete} />}
              disabled={!hasSelected}
              onClick={() => setShowDeleteCourse(true)}
            />
            <ExportButton onClick={() => setShowExport(true)} />
            <Divider className={classes['separator']} type="vertical" />
            <WMButton
              className={classes['create-btn']}
              shape="round"
              variant={ButtonVariantEnum.Create}
              icon={<PlusOutlined />}
            >
              Create Course
            </WMButton>
            <SearchFilter placeholder="Search course name" onSearch={onSearch} />
          </ControlsWrapper>
        </WMTable>
      </WMCard>
      {/* Dialogs */}
      <DialogPublishToEnvironment
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
