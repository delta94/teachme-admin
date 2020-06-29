import React, { ReactElement, useState } from 'react';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import WMDropdown from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

const systems = ['Salesforce', 'Option 2', 'Option 3'];

export default function SystemMenu(): ReactElement {
  const [selectedSystem, setSelectedSystem] = useState(systems[0]);

  const handleMenuClick = (e: any) => {
    setSelectedSystem(systems[e.key]);
    console.log('click', e);
    message.info(`System changed to ${e.item.node.innerHTML}`);
  };

  return (
    <WMDropdown
      className="system-menu"
      options={systems}
      selected={selectedSystem}
      onSelectedChange={handleMenuClick}
    >
      <WMButton type="link">
        {selectedSystem}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
