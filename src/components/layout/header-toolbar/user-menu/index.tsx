import React, { ReactElement } from 'react';
import { Menu, message, Button } from 'antd';

import { IconType } from '../../../common/icon/icon.interface';
import Icon from '../../../common/icon';

import classes from '../style.module.scss';
import WMDropdown from '../../../common/WMDropdown';

const options = ['Dan@walkme.com', 'Impersonate', 'Log Out'];

export default function UserMenu(): ReactElement {
  const handleMenuClick = (e: any) => {
    console.log('click', e);
    message.info(`User clicked on ${options[e.key]}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className="wm-dropdown-menu user-menu">
      {options.map((option, index) => (
        <Menu.Item key={index}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <WMDropdown dropdownMenu={menu}>
      {/**
       * TODO - @dvir: replace Button with WMButton
       */}
      <Button className={classes.user} type={'link'} icon={<Icon type={IconType.HeaderAvatar} />} />
    </WMDropdown>
  );
}
