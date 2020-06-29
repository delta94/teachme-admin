import React, { ReactElement, useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

const environments: IWMDropdownOption[] = [
  { id: 0, text: 'Production' },
  { id: 1, text: 'Test' },
];

export default function EnvironmentMenu(): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedEnvironment(selected);
    message.info(`Environment changed to ${selected.text}`);
  };

  return (
    <WMDropdown
      className="environment-menu"
      options={environments}
      selected={selectedEnvironment}
      onSelectedChange={handleMenuClick}
    >
      <WMButton type="link">
        {selectedEnvironment.text}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
