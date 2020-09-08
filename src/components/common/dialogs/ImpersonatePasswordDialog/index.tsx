import React, { ReactElement, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { useDebounceCallback } from '@react-hook/debounce';

import { getEmails, impersonate } from '../../../../walkme';
import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

import classes from './style.module.scss';

export interface IImpersonatePasswordDialog extends IWMConfirmationDialogWrapper {
  value?: string;
  afterClose: () => void;
}

export default function ImpersonatePasswordDialog({
  open,
  onCancel,
  onConfirm,
  value,
  afterClose,
}: IImpersonatePasswordDialog): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  const onConfirmHandle = async (confirmedText: string | undefined) => {
    setLocalValue('');
    onConfirm(confirmedText);
  };

  const onCancelHandle = () => {
    onCancel();
    setLocalValue('');
  };

  const onChangeHandle = (value: string) => {
    setLocalValue(value);
  };

  return (
    <WMConfirmationDialog
      open={open}
      title="Enter Impersonate Password"
      onCancel={onCancelHandle}
      onConfirm={() => onConfirmHandle(localValue)}
      confirmLabel="OK"
      className={classes['impersonate-password-dialog']}
      destroyOnClose={true}
      afterClose={afterClose}
    >
      <Input
        className={classes['impersonate-password-input']}
        value={localValue}
        placeholder="Enter password"
        onChange={({ nativeEvent }) =>
          onChangeHandle((nativeEvent.target as HTMLInputElement)?.value)
        }
        onPressEnter={({ nativeEvent }) =>
          onConfirmHandle((nativeEvent.target as HTMLInputElement)?.value)
        }
        type="password"
      />
    </WMConfirmationDialog>
  );
}
