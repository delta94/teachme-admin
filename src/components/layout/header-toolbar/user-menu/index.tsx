import React, { ReactElement } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';

import { IconType } from '../../../common/icon/icon.interface';

import Icon from '../../../common/icon';

export default function UserMenu(): ReactElement {
  const handleMenuClick = (e: any) => {
    console.log('click', e);
    message.info(`User clicked on ${e.item.node.innerHTML}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="teachme-header-toolbar-menu user-menu">
      <Menu.Item key="0">Dan@walkme.com</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">Impersonate</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">Log Out</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type="link" icon={<Icon type={IconType.HeaderAvatar} />} className="user"></Button>
    </Dropdown>
  );
}
