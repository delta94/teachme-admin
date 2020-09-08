import React, { ReactElement, useState, useEffect } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { logout, setImpersonatePWCallback } from '../../../walkme';
import { dateRangeLocalStorageKey } from '../../../utils';

import { IconType } from '../../common/Icon/icon.interface';
import Icon from '../../common/Icon';
import WMDropdown, { IWMDropdownOption } from '../../common/WMDropdown';
import WMButton from '../../common/WMButton';
import { ImpersonateDialog } from '../../common/dialogs';
import ImpersonatePasswordDialog from '../../common/dialogs/ImpersonatePasswordDialog';

export default function UserMenu({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}): ReactElement {
  const [showImpersonate, setShowImpersonate] = useState(false);
  const [renderImpersonate, setRenderImpersonate] = useState(false);
  const [showImpersonatePassword, setShowImpersonatePassword] = useState(false);
  const [impersonatePasswordPromise, setImpersonatePasswordPromise] = useState<{
    resolve(value?: string): void;
    reject(): void;
  }>();

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

  const getImpersonatePassword = async (): Promise<string> => {
    setRenderImpersonate(true);
    setShowImpersonatePassword(true);
    return await new Promise((resolve, reject) => {
      setImpersonatePasswordPromise({ resolve, reject });
    });
  };

  useEffect(() => {
    setImpersonatePWCallback(getImpersonatePassword);
  }, []);

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
      {renderImpersonate && (
        <ImpersonatePasswordDialog
          open={showImpersonatePassword}
          onCancel={() => {
            setShowImpersonatePassword(false);
            impersonatePasswordPromise?.reject();
          }}
          onConfirm={(password) => {
            setShowImpersonatePassword(false);
            impersonatePasswordPromise?.resolve(password);
          }}
          afterClose={() => setRenderImpersonate(false)}
        />
      )}
    </>
  );
}
