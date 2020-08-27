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
  const [invalid, setInvalid] = useState(true);

  const fetchEmails = async (value: string) => {
    if (!value) return;

    const { emails } = await getEmails(value);
    const emailList = emails && emails.map((email: string) => ({ value: email }));
    setOptions(emailList);
  };

  const debouncedFetchEmails = useDebounceCallback(fetchEmails, 400);

  const onEmailChange = (value: string) => {
    debouncedFetchEmails(value);
    setLocalValue(value);
    const valid = options && options.some((item) => item.value === value);
    setInvalid(!valid);
  };

  const onConfirmHandle = async (confirmedText: string | undefined) => {
    confirmedText && (await impersonate(confirmedText));
    setLocalValue('');
    onConfirm(confirmedText);
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
      className={classes['impersonate-dialog']}
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
        onSelect={onConfirmHandle}
      />
    </WMConfirmationDialog>
  );
}
