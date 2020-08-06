import React, { ReactElement, useState } from 'react';
import { AutoComplete } from 'antd';
import { useDebounceCallback } from '@react-hook/debounce';

import { getEmails, impersonate } from '../../../../walkme';
import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

import classes from './style.module.scss';

export interface IImpersonateDialog extends IWMConfirmationDialogWrapper {
  value?: string;
}

export default function ImpersonateDialog({
  open,
  onCancel,
  onConfirm,
  value,
}: IImpersonateDialog): ReactElement {
  const [localValue, setLocalValue] = useState(value);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [invalid, setInvalid] = useState(false);

  const fetchEmails = async (value: string) => {
    const { emails } = await getEmails(value, true);
    const emailList = emails.map((email: string) => ({ value: email }));
    setOptions(emailList);
  };

  const debouncedFetchEmails = useDebounceCallback(fetchEmails, 400);

  const onEmailChange = (value: string) => {
    debouncedFetchEmails(value);
    setLocalValue(value);
    const valid = options.some((item) => item.value === value);
    valid ? setInvalid(false) : setInvalid(true);
  };

  const onConfirmHandle = (confirmedText: string | undefined) => {
    onConfirm(confirmedText);
    confirmedText && impersonate(confirmedText, true);
    setLocalValue('');
  };

  const onCancelHandle = () => {
    onCancel();
    setLocalValue('');
  };

  return (
    <WMConfirmationDialog
      open={open}
      title="Impersonate user"
      onCancel={onCancelHandle}
      onConfirm={() => onConfirmHandle(localValue)}
      disableConfirmButton={invalid}
      confirmLabel="impersonate"
    >
      <AutoComplete
        className={classes['autocomplete-input']}
        options={options}
        onChange={onEmailChange}
        value={localValue}
        placeholder="Enter email address"
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().includes(inputValue.toUpperCase())
        }
      />
    </WMConfirmationDialog>
  );
}
