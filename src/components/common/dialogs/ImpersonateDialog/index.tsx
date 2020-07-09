import React, { ReactElement, useState } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import WMInput from '../../WMInput';

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

  function onEmailChange(e: any) {
    setLocalValue(e.target.value);
  }

  return (
    <WMConfirmationDialog
      open={open}
      title="Impersonate user"
      onCancel={onCancel}
      onConfirm={() => onConfirm(localValue)}
    >
      <WMInput placeholder="Enter email address" onChange={onEmailChange} value={localValue} />
    </WMConfirmationDialog>
  );
}
