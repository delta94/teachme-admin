import React, { ReactElement, useState } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { logout } from '../../../walkme';
import { dateRangeLocalStorageKey } from '../../../utils';

import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';
import { ImpersonateDialog } from '../../common/dialogs';

export default function UserMenu({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}): ReactElement {
  const [showImpersonate, setShowImpersonate] = useState(false);
  const [appState] = useAppContext();
  const { user } = appState;
  const { originalUser } = appState;

  const options: IWMDropdownOption[] = [
    { id: 'user-name', value: user.userName },
    {
      id: 'impersonate',
      value: 'Impersonate',
      onClick: () => setShowImpersonate(true),
      skip: !originalUser.userIsBackOffice,
    },
    {
      id: 'log-out',
      value: 'Log Out',
      onClick: () => {
        // Remove `dateRange` from `localStorage` on manual logout
        localStorage.removeItem(dateRangeLocalStorageKey);
        logout();
      },
    },
  ];

  const handleImpersonate = () => {
    setShowImpersonate(false);
    window.location.reload();
  };

  return (
    <>
      <WMDropdown className={className} options={options}>
        <WMButton className={buttonClassName} icon={<Icon type={IconType.HeaderAvatar} />} />
      </WMDropdown>
      <ImpersonateDialog
        open={showImpersonate}
        onCancel={() => setShowImpersonate(false)}
        onConfirm={handleImpersonate}
      />
    </>
  );
}
