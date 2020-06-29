import React, { ReactElement } from 'react';
import { message } from 'antd';

import { IconType } from '../../../common/Icon/icon.interface';
import Icon from '../../../common/Icon';
import WMDropdown from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

import classes from '../style.module.scss';

// TODO: replace this mock with SDK's data
const options = ['Dan@walkme.com', 'Impersonate', 'Log Out'];

export default function UserMenu(): ReactElement {
  const handleMenuClick = (e: any) => {
    console.log('click', e);
    message.info(`User clicked on ${options[e.key]}`);
  };

  return (
    <WMDropdown className="user-menu" options={options} onSelectedChange={handleMenuClick}>
      <WMButton className={classes.user} type="link" icon={<Icon type={IconType.HeaderAvatar} />} />
    </WMDropdown>
  );
}
