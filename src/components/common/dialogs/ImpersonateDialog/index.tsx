import React, { ReactElement, useState } from 'react';

import { AutoComplete } from 'antd';

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

  async function onEmailChange(value: string) {
    const { emails } = await getEmails(value);
    const emailList = emails.map((email) => ({ value: email }));
    setOptions(emailList);
    setLocalValue(value);
  }

  const onConfirmValue = (userValue: string | undefined) => {
    onConfirm(userValue);
    userValue && impersonate(userValue);
  };

  return (
    <WMConfirmationDialog
      open={open}
      title="Impersonate user"
      onCancel={onCancel}
      onConfirm={() => onConfirmValue(localValue)}
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
