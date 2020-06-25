import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import classes from '../style.module.scss';

const systems = ['Salesforce', 'Option 2', 'Option 3'];

export default function SystemMenu(): ReactElement {
  const [selectedSystem, setSelectedSystem] = useState(systems[0]);

  const handleMenuClick = (e: any) => {
    setSelectedSystem(systems[e.key]);
    console.log('click', e);
    message.info(`System changed to ${e.item.node.innerHTML}`);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      className={cc([classes['teachme-header-toolbar-menu'], classes['system-menu']])}
    >
      {systems.map((system, index) => (
        <Menu.Item
          className={cc([{ [classes['selected-item']]: selectedSystem === system }])}
          key={index}
        >
          {system}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button type="link" className={classes['system-menu']}>
        {selectedSystem}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
