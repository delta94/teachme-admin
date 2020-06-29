import React, { ReactElement, useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import WMDropdown from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

const environments = ['Production', 'Test'];

export default function EnvironmentMenu(): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (e: any) => {
    setSelectedEnvironment(environments[e.key]);
    message.info(`Environment changed to ${e.item.node.innerHTML}`);
    console.log('click', e);
  };

  return (
    <WMDropdown
      className="environment-menu"
      options={environments}
      selected={selectedEnvironment}
      onSelectedChange={handleMenuClick}
    >
      <WMButton type="link">
        {selectedEnvironment}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
