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
      title="Delete Courses"
      confirmLabel="Delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
      disableConfirmButton
    >
      <p>
        At least 1 of the courses you selected is Published and cannot be deleted. You must archive
        it first.
      </p>
    </WMConfirmationDialog>
  );
}
