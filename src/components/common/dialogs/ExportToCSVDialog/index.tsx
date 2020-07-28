import React, { ReactElement, useState } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import { WMVerticalRadioGroup } from '../../WMRadio';
import WMInput from '../../WMInput';

import classes from './style.module.scss';

export default function ExportToCSVDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  const [value, setValue] = useState<number>(0);
  const [email, setEmail] = useState<string | undefined>(undefined);

  function onEmailChange(e: any) {
    setEmail(e.target.value);
  }

  const options = [
    { label: 'Download CSV file', value: 0 },
    {
      label: (
        <>
          Send via email
          <br />
          <WMInput
            className={classes['email-input']}
            value={email}
            placeholder="Enter email address"
            onChange={onEmailChange}
            disabled={value !== 1}
          />
        </>
      ),
      value: 1,
    },
  ];

  function onOptionChange(value: any) {
    setValue(value);
  }
  const data = { value, email };
  return (
    <>
      <WMConfirmationDialog
        open={open}
        title="Export data"
        onCancel={onCancel}
        onConfirm={() => onConfirm(data)}
      >
        <p>You are about to export data of 8 courses.</p>
        <WMVerticalRadioGroup options={options} onChange={onOptionChange} value={value} />
      </WMConfirmationDialog>
    </>
  );
}
