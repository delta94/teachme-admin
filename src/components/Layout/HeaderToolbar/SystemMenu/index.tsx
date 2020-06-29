import React, { ReactElement, useState } from 'react';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

const systems: IWMDropdownOption[] = [
  { id: 'ddd', text: 'Salesforce' },
  { id: 'xxxx', text: 'Option 2' },
  { id: 'ccc', text: 'Option 3' },
];

export default function SystemMenu(): ReactElement {
  const [selectedSystem, setSelectedSystem] = useState(systems[0]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedSystem(selected);
    message.info(`System changed to ${selected.text}`);
  };

  return (
    <WMDropdown
      className="system-menu"
      options={systems}
      selected={selectedSystem}
      onSelectedChange={handleMenuClick}
    >
      <WMButton type="link">
        {selectedSystem.text}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
