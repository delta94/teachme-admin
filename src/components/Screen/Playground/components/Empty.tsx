import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import WMEmpty from '../../../common/WMEmpty';
import Icon, { IconType } from '../../../common/Icon';
import AddButton from '../../../common/buttons/AddButton';

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
        description="There are no items available.
        Create Walk-thrus and resources from the WalkMe Editor."
        image={false}
      />
      <Divider />
      <WMEmpty description="No results found" image={false} />
      <Divider />
      <WMEmpty
        description="Drag content into the lesson"
        image={<Icon type={IconType.LessonEmpty} />}
      />
    </>
  );
}
