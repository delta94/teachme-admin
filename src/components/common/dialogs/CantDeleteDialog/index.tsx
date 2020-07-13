import React, { ReactElement } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

export default function CantDeleteDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  return (
    <WMConfirmationDialog
      open={open}
      title="You can’t delete this course"
      confirmLabel="Delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <p>You must first archive a published course in order to delete it</p>
    </WMConfirmationDialog>
  );
}
