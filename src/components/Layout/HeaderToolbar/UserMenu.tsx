import React, { ReactElement, useState } from 'react';

import { useAppContext, setInitialGlobals } from '../../../providers/AppContext';
import { logout } from '../../../walkme';

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
  const [appState, appDispatch] = useAppContext();
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
    { id: 'log-out', value: 'Log Out', onClick: () => logout() },
  ];

  const handleImpersonate = () => {
    setShowImpersonate(false);
    setInitialGlobals(appDispatch);
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
