import React, { ReactElement } from 'react';
import { message } from 'antd';

import { logout } from '../../../../walkme';

import { IconType } from '../../../common/Icon/icon.interface';
import Icon from '../../../common/Icon';
import WMDropdown, { IWMDropdownOption } from '../../../common/WMDropdown';
import WMButton from '../../../common/WMButton';

// TODO: replace this mock with SDK's data
const options: IWMDropdownOption[] = [
  { id: 0, value: 'Dan@walkme.com' },
  { id: 1, value: 'Impersonate' },
  { id: 2, value: 'Log Out', onClick: () => logout() },
];

export default function UserMenu({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}): ReactElement {
  const handleMenuClick = (selected: IWMDropdownOption) => {
    message.info(`User clicked on ${selected.value}`);
  };

  return (
    <WMDropdown className={className} options={options} onSelectedChange={handleMenuClick}>
      <WMButton className={buttonClassName} icon={<Icon type={IconType.HeaderAvatar} />} />
    </WMDropdown>
  );
}
