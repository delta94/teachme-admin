import React, { ReactElement, useState } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function EnvironmentMenu(): ReactElement {
  const environments = ['Production', 'Test'];

  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);

  const handleMenuClick = (e: any) => {
    setSelectedEnvironment(environments[e.key]);
    message.info(`Environment changed to ${e.item.node.innerHTML}`);
    console.log('click', e);
  };

  // TODO: improve the code (I tried to use map but something makes it break)
  const menu = (
    <Menu onClick={handleMenuClick} className="teachme-header-toolbar-menu environment-menu">
      <Menu.Item key="0">{environments[0]}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">{environments[1]}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button type="link" className="environment-menu">
        {selectedEnvironment}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
