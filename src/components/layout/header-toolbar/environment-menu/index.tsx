import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Button, message } from 'antd';

import WMDropdown from '../../../common/WMDropdown';

const environments = ['Production', 'Test'];

export default function EnvironmentMenu(): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (e: any) => {
    setSelectedEnvironment(environments[e.key]);
    message.info(`Environment changed to ${e.item.node.innerHTML}`);
    console.log('click', e);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="wm-dropdown-menu environment-menu">
      {environments.map((env, index) => (
        <Menu.Item className={cc([{ 'selected-item': selectedEnvironment === env }])} key={index}>
          {env}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <WMDropdown dropdownMenu={menu}>
      {/**
       * TODO - @dvir: replace Button with WMButton
       */}
      <Button type="link" className="wm-btn">
        {selectedEnvironment}
        <DownOutlined />
      </Button>
    </WMDropdown>
  );
}
