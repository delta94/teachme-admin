import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import WMEmpty from '../../../common/WMEmpty';
import Icon, { IconType } from '../../../common/Icon';
import AddButton from '../../../common/buttons/AddButton';

export default function Counter(): ReactElement {
  return (
    <>
      <WMEmpty
        description="Start building your course by creating lessons and dragging items from the Items List"
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
      />
      <Divider />
      <WMEmpty description="No results found" />
      <Divider />
      <WMEmpty
        description="Drag content into the lesson"
        image={<Icon type={IconType.LessonEmpty} />}
      />
    </>
  );
}
