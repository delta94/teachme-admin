import React, { ReactElement, useState, Key, ChangeEvent } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import { WMVerticalRadioGroup } from '../../WMRadio';
import WMInput from '../../WMInput';

import classes from './style.module.scss';

export interface IExportToCSVDialog extends IWMConfirmationDialogWrapper {
  coursesCount: number;
}

export default function ExportToCSVDialog({
  coursesCount,
  open,
  onCancel,
  onConfirm,
}: IExportToCSVDialog): ReactElement {
  const [value, setValue] = useState<Key>(0);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onOptionChange = (value: Key) => setValue(value);

  const data = { value, email };

  const options = [
    { label: 'Download CSV file', value: 0, disabled: !coursesCount },
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
      disabled: true,
    },
  ];

  return (
    <WMConfirmationDialog
      open={open}
      title="Export data"
      onCancel={onCancel}
      onConfirm={() => onConfirm(data)}
      disableConfirmButton={!coursesCount}
    >
      <p>
        {coursesCount
          ? `You are about to export data of ${coursesCount} course${coursesCount > 1 ? 's' : ''}.`
          : 'No available courses to export'}
      </p>
      <WMVerticalRadioGroup options={options} onChange={onOptionChange} value={value} />
    </WMConfirmationDialog>
  );
}
