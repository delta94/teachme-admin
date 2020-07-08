import React, { ReactElement } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

export default function DeleteLessonDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  return (
    <WMConfirmationDialog
      open={open}
      title="Delete lesson"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <p>
        This lesson contains items.
        <br />
        Are you sure you want to delete it?
      </p>
    </WMConfirmationDialog>
  );
}
