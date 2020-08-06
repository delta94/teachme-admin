import React, { ReactElement } from 'react';
import WMConfirmationDialog, {
  IWMConfirmationDialogWrapper,
} from '../../../common/WMConfirmationDialog';

import classes from './style.module.scss';

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
      confirmLabel="Delete"
      onConfirm={onConfirm}
      confirmClass={classes['delete-button']}
    >
      <p>
        This lesson contains items.
        <br />
        Are you sure you want to delete it?
        <br />
        Note, this cannot be undone.
      </p>
    </WMConfirmationDialog>
  );
}
