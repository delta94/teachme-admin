import React, { ReactElement } from 'react';
import cc from 'classcat';
import { message } from 'antd';

import { IconType } from '../../../common/Icon/icon.interface';
import Icon from '../../../common/Icon';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';
import classes from '../style.module.scss';

// TODO: replace this mock with SDK's data
const options: IWMDropdownOption[] = [
  { id: 0, text: 'Dan@walkme.com' },
  { id: 1, text: 'Impersonate' },
  { id: 2, text: 'Log Out' },
];

export default function UserMenu(): ReactElement {
  const handleMenuClick = (selected: IWMDropdownOption) => {
    message.info(`User clicked on ${selected.text}`);
  };

  return (
    <WMDropdown
      className={cc(['user-menu', 'header-toolbar-menu'])}
      options={options}
      onSelectedChange={handleMenuClick}
    >
      <WMButton className={classes.user} type="link" icon={<Icon type={IconType.HeaderAvatar} />} />
    </WMDropdown>
  );
}
