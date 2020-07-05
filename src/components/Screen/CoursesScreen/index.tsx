import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { Divider, message } from 'antd';
import { DownOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { coursesMockData } from '../../../constants/mocks/courses-mock';
import { data as tableData, columns } from '../../../mocks/tableMockData';

import WMCard from '../../common/WMCard';
import WMTable from '../../common/WMTable';
import ScreenHeader from '../../common/ScreenHeader';
import CoursesTimeCompletionChart from '../../common/CourseTimeCompletionChart';
import QuizCompletionRateChart from '../../common/QuizCompletionRateChart';
import DropdownFilter from '../../common/filters/DropdownFilter';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import SearchFilter from '../../common/filters/SearchFilter';
import ExportButton from '../../common/buttons/ExportButton';
import WMButton from '../../common/WMButton';

import CourseStatusChart from './CourseStatusChart';
import classes from './style.module.scss';

interface ICourseData {
  key: string;
  name: string;
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
  const {
    title: mainTitle,
    analytics: { graph_1, graph_2, graph_3 },
    CoursesTable,
  } = coursesMockData;

  const [selectedProdStatus, setSelectedProdStatus] = useState(prodStatuses[0]);

  const onProdStatusChange = (selected: IWMDropdownOption) => {
    setSelectedProdStatus(selected);
    message.info(`Production status changed to ${selected.text}`);
  };

  return (
    <>
      <ScreenHeader title={mainTitle} />
      <div className={classes.analytics}>
        <div className={cc([classes.graphs, classes['left-graphs']])}>
          <CourseStatusChart title={graph_1.title} />
        </div>
        <div className={cc([classes.graphs, classes['right-graphs']])}>
          <WMCard title={graph_2.title}>
            <CoursesTimeCompletionChart />
          </WMCard>
          <WMCard title={graph_3.title}>
            <QuizCompletionRateChart />
          </WMCard>
        </div>
      </div>
      <WMCard
        title={`${tableData.length} ${CoursesTable.title}`}
        subTitle="Courses will appear to your users in the order below. Drag & Drop items to change their order."
      >
        <WMTable data={tableData as Array<ICourseData>} columns={columns}>
          <div className={classes['controls-wrapper']}>
            <DropdownFilter label="Status" options={statuses} />
            <DropdownFilter label="Segments" options={segments} />
          </div>
          <div className={classes['controls-wrapper']}>
            <WMDropdown
              options={prodStatuses}
              selected={selectedProdStatus}
              onSelectedChange={onProdStatusChange}
            >
              <WMButton className={classes['prod-status']} type="link">
                Change Status
                <DownOutlined />
              </WMButton>
            </WMDropdown>
            <Divider className={classes['controls-separator']} type="vertical" />
            <WMButton className={classes['delete-btn']} icon={<DeleteOutlined />} />
            <ExportButton />
            <Divider className={classes['controls-separator']} type="vertical" />
            <WMButton className={classes['create-btn']} type="link" icon={<PlusOutlined />}>
              Create Course
            </WMButton>
            <SearchFilter placeholder="Search course name" />
          </div>
        </WMTable>
      </WMCard>
    </>
  );
}
