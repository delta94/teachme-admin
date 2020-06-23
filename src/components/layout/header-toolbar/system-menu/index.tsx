import React, { ReactElement, useState } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function SystemMenu(): ReactElement {
  const options = ['Salesforce', 'Option 2', 'Option 3'];

  const [selectedSystem, setSelectedSystem] = useState(options[0]);

  const handleMenuClick = (e: any) => {
    setSelectedSystem(options[e.key]);
    console.log('click', e);
    message.info(`System changed to ${e.item.node.innerHTML}`);
  };

  // TODO: improve the code (I tried to use map but something makes it break)
  const menu = (
    <Menu onClick={handleMenuClick} className="teachme-header-toolbar-menu system-menu">
      <Menu.Item key="0">{options[0]}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">{options[1]}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">{options[2]}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button type="link" className="system-menu">
        {selectedSystem}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
