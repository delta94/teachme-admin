import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { Menu, message } from 'antd';
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

  const menu = (
    <Menu onClick={handleMenuClick} className={'wm-dropdown-menu environment-menu'}>
      {systems.map((system, index) => (
        <Menu.Item className={cc([{ 'selected-item': selectedSystem === system }])} key={index}>
          {system}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <WMDropdown dropdownMenu={menu}>
      <WMButton>
        {selectedSystem}
        <DownOutlined />
      </WMButton>
    </WMDropdown>
  );
}
