import React, { ReactElement, useState } from 'react';
import { message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import classes from '../style.module.scss';

const systems: IWMDropdownOption[] = [
  { id: 0, text: 'Salesforce' },
  { id: 1, text: 'Option 2' },
  { id: 2, text: 'Option 3' },
];

export default function SystemMenu({ className }: { className?: string }): ReactElement {
  const [selectedSystem, setSelectedSystem] = useState(systems[0]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedSystem(selected);
    message.info(`System changed to ${selected.text}`);
  };

  return (
    <WMDropdown
      className={className}
      options={systems}
      selected={selectedSystem}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes['dropdown-menu-button']}>
        {selectedSystem.text}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
