import React, { ReactElement } from 'react';
import { message } from 'antd';

import { useAppContext } from '../../../providers/AppContext';
import { logout } from '../../../walkme';

import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';

import classes from './style.module.scss';

export default function UserMenu({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}): ReactElement {
  const [appState, appDispatch] = useAppContext();
  const { user } = appState;

  const options: IWMDropdownOption[] = [
    { id: 0, value: user.userName },
    { id: 1, value: 'Impersonate' },
    { id: 2, value: 'Log Out', onClick: () => logout() },
  ];

  const handleMenuClick = (selected: IWMDropdownOption) => {
    message.info(`User clicked on ${selected.value}`);
  };

  return (
    <WMDropdown className={className} options={options} onSelectedChange={handleMenuClick}>
      <WMButton className={buttonClassName} icon={<Icon type={IconType.HeaderAvatar} />} />
    </WMDropdown>
  );
}
