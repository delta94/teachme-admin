import React, { ReactElement } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

export default function DeleteCourseDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  return (
    <WMConfirmationDialog
      open={open}
      title="Delete Lesson"
      confirmLabel="Delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <p>This lesson contains items. Are you sure you want to delete it?</p>
    </WMConfirmationDialog>
  );
}
