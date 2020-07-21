import React, { ReactElement } from 'react';
import { Button, Space } from 'antd';

import { wmMessage } from '../../../common/wmMessage';

export default function Toaster(): ReactElement {
  return (
    <Space>
      <Button onClick={() => wmMessage('1 course published to production')}>Button</Button>
    </Space>
  );
}
