import React, { ReactElement } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';

import { IconType } from '../../../common/icon/icon.interface';

import Icon from '../../../common/icon';

const options = ['Dan@walkme.com', 'Impersonate', 'Log Out'];

export default function UserMenu(): ReactElement {
  const handleMenuClick = (e: any) => {
    console.log('click', e);
    message.info(`User clicked on ${options[e.key]}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="teachme-header-toolbar-menu user-menu">
      {options.map((option, index) => (
        <Menu.Item key={index}>{option}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type="link" icon={<Icon type={IconType.HeaderAvatar} />} className="user"></Button>
    </Dropdown>
  );
}
