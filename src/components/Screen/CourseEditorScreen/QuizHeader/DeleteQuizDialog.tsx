import React, { ReactElement } from 'react';
import WMConfirmationDialog, {
  IWMConfirmationDialogWrapper,
} from '../../../common/WMConfirmationDialog';

import classes from './style.module.scss';

export default function DeleteQuizDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  return (
    <WMConfirmationDialog
      open={open}
      title="Delete quiz?"
      onCancel={onCancel}
      confirmLabel="Delete"
      onConfirm={onConfirm}
      confirmClass={classes['delete-button']}
    >
      <p>
        Are you sure you want to delete this quiz?
        <br />
        Note, this cannot be undone.
      </p>
    </WMConfirmationDialog>
  );
}
