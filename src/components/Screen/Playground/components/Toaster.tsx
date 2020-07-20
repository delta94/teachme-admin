import React, { ReactElement } from 'react';

import { Button, Space } from 'antd';
import { wmMessageSuccess } from '../../../common/wmMessage';

export default function Toaster(): ReactElement {
  return (
    <Space>
      <Button onClick={() => wmMessageSuccess('1 course published to production')}>Button</Button>
    </Space>
  );
}
