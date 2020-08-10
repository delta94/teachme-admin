import React, { ReactElement } from 'react';

import WMConfirmationDialog, {
  IWMConfirmationDialogWrapper,
} from '../../../common/WMConfirmationDialog';

import classes from './style.module.scss';

export default function CancelDialog({
  open,
  onCancel,
  onConfirm,
}: IWMConfirmationDialogWrapper): ReactElement {
  return (
    <WMConfirmationDialog
      open={open}
      title="Discard changes?"
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmLabel="Discard"
      confirmClass={classes['discard-button']}
    >
      <p>All unsaved changes will be lost</p>
    </WMConfirmationDialog>
  );
}
