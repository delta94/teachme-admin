import React, { ReactElement } from 'react';

import WMConfirmationDialog, {
  IWMConfirmationDialogWrapper,
} from '../../../common/WMConfirmationDialog';

export default function CancelDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  return (
    <WMConfirmationDialog open={open} title="Cancel" onCancel={onCancel} onConfirm={onConfirm}>
      <p>Canceling will revert all unsaved changes. Would you like to proceed?</p>
    </WMConfirmationDialog>
  );
}
