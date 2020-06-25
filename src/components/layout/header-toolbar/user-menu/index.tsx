import React, { ReactElement } from 'react';
import cc from 'classcat';
import { Menu, Dropdown, Button, message } from 'antd';

import { IconType } from '../../../common/icon/icon.interface';
import Icon from '../../../common/icon';

import classes from '../style.module.scss';

const options = ['Dan@walkme.com', 'Impersonate', 'Log Out'];

export default function UserMenu(): ReactElement {
  const handleMenuClick = (e: any) => {
    console.log('click', e);
    message.info(`User clicked on ${options[e.key]}`);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      className={cc([classes['teachme-header-toolbar-menu'], classes['user-menu']])}
    >
      {options.map((option, index) => (
        <Menu.Item key={index}>{option}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type="link" icon={<Icon type={IconType.HeaderAvatar} />} className={classes.user} />
    </Dropdown>
  );
}
