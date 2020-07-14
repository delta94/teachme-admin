import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import WMEmpty from '../../../common/WMEmpty';
import Icon, { IconType } from '../../../common/Icon';
import AddButton from '../../../common/buttons/AddButton';
import CourseSummaryChart from '../../../common/AnalyticsCharts/CourseSummaryChart';

export default function Counter(): ReactElement {
  return (
    <>
      <WMEmpty
        description="Start building your course by creating lessons and draging items from the Items List"
        image={<Icon type={IconType.CourseEmpty} />}
      >
        <AddButton />
      </WMEmpty>
      <Divider />
      <WMEmpty
        description={
          <>
            <div>There are no items available.</div>
            <div>Create Walk-thrus and resources from the WalkMe Editor.</div>
          </>
        }
        image={null}
      />
      <Divider />
      <WMEmpty description="No results found" image={null} />
      <Divider />
      <WMEmpty
        description="Drag content into the lesson"
        image={<Icon type={IconType.LessonEmpty} />}
      />
      <CourseSummaryChart summaryData={null} />
    </>
  );
}
