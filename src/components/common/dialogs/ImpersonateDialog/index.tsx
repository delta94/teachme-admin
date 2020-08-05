import React, { ReactElement, useState } from 'react';
import { AutoComplete } from 'antd';
import { useDebounceCallback } from '@react-hook/debounce';

import { getEmails } from '../../../../walkme';
import { impersonate } from '../../../../walkme';
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
    const emailList = emails.map((email) => ({ value: email }));
    setOptions(emailList);
  };

  const debouncedFetchEmails = useDebounceCallback(fetchEmails, 400);

  const onEmailChange = (value: string) => {
    debouncedFetchEmails(value);
    setLocalValue(value);
    const valid = options.some((item) => item.value === value);
    if (valid) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  const onConfirmHandle = (userValue: string | undefined) => {
    onConfirm(userValue);
    userValue && impersonate(userValue, true);
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
    >
      <AutoComplete
        className={classes['impersonate-dialog']}
        options={options}
        onChange={onEmailChange}
        value={localValue}
        placeholder="Enter email address"
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </WMConfirmationDialog>
  );
}
