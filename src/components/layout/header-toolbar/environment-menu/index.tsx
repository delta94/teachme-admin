import React, { ReactElement, useState } from 'react';
import cc from 'classcat';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import classes from '../style.module.scss';

const environments = ['Production', 'Test'];

export default function EnvironmentMenu(): ReactElement {
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (e: any) => {
    setSelectedEnvironment(environments[e.key]);
    message.info(`Environment changed to ${e.item.node.innerHTML}`);
    console.log('click', e);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      className={cc([classes['teachme-header-toolbar-menu'], classes['environment-menu']])}
    >
      {environments.map((env, index) => (
        <Menu.Item className={cc([{ 'selected-item': selectedEnvironment === env }])} key={index}>
          {env}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button type="link" className={classes['environment-menu']}>
        {selectedEnvironment}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
