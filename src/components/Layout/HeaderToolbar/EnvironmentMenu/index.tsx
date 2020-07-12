import React, { ReactElement, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { message } from 'antd';

import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import classes from '../style.module.scss';

const environments: IWMDropdownOption[] = [
  { id: 0, value: 'Production' },
  { id: 1, value: 'Test' },
];

export default function EnvironmentMenu({ className }: { className?: string }): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (selected: IWMDropdownOption) => {
    setSelectedEnvironment(selected);
    message.info(`Environment changed to ${selected.value}`);
  };

  return (
    <WMDropdown
      className={className}
      options={environments}
      selected={selectedEnvironment}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes['dropdown-menu-button']}>
        {selectedEnvironment.value}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
