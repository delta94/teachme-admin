import React, { ReactElement, useState } from 'react';
import { Divider, message } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

import { coursesMockData } from '../../../constants/mocks/courses-screen';
import courseCompletionChartMock from '../../../constants/mocks/courseCompletionChartMock';
import courseCompletionRateChartMock from '../../../constants/mocks/courseCompletionRateChartMock';
import { data, columns } from '../../../constants/mocks/tableMockCoursesData';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import AnalyticsCharts from '../../common/AnalyticsCharts';
import ControlsWrapper from '../../common/ControlsWrapper';
import DropdownFilter from '../../common/filters/DropdownFilter';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import SearchFilter from '../../common/filters/SearchFilter';
import ExportButton from '../../common/buttons/ExportButton';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';
import Icon, { IconType } from '../../common/Icon';

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
  { id: 0, text: 'All Status' },
  { id: 1, text: 'Published' },
  { id: 2, text: 'Modified' },
  { id: 3, text: 'Draft' },
  { id: 4, text: 'Archived' },
];

const segments: IWMDropdownOption[] = [
  { id: 0, text: 'All Segments' },
  { id: 1, text: 'All Employees' },
  { id: 2, text: 'HR' },
  { id: 3, text: 'Sales' },
  { id: 4, text: 'Product' },
  { id: 5, text: 'R&D' },
];

const prodStatuses: IWMDropdownOption[] = [
  { id: 0, text: 'Published' },
  { id: 1, text: 'Draft' },
  { id: 2, text: 'Archived' },
];

export default function CoursesScreen(): ReactElement {
  const { title: mainTitle, analytics, CoursesTable } = coursesMockData;
  const [tableData, setTableData] = useState(data);

  const onSearch = (searchValue: string) => {
    const newTableData = data.filter((course) =>
      course.name.value.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setTableData(newTableData);
  };

  const [selectedProdStatus, setSelectedProdStatus] = useState(prodStatuses[0]);

  const onProdStatusChange = (selected: IWMDropdownOption) => {
    setSelectedProdStatus(selected);
    message.info(`Production status changed to ${selected.text}`);
  };

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <AnalyticsCharts
        data={analytics}
        courseTimeCompletionData={courseCompletionChartMock}
        quizCompletionRateData={courseCompletionRateChartMock}
      />
      <WMCard
        title={`${tableData.length} ${CoursesTable.title}`}
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        <WMTable data={tableData as Array<ICourseData>} columns={columns}>
          <ControlsWrapper>
            <DropdownFilter label="Status" options={statuses} />
            <DropdownFilter label="Segments" options={segments} />
          </ControlsWrapper>
          <ControlsWrapper>
            <WMDropdown
              options={prodStatuses}
              selected={selectedProdStatus}
              onSelectedChange={onProdStatusChange}
            >
              <WMButton className={classes['prod-status']}>
                Change Status
                <DownOutlined />
              </WMButton>
            </WMDropdown>
            <Divider className={classes['separator']} type="vertical" />
            <WMButton className={classes['delete-btn']} icon={<Icon type={IconType.Delete} />} />
            <ExportButton />
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
    </>
  );
}
