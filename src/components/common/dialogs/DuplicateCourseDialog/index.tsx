import React, { ReactElement, useState } from 'react';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';
import WMInput from '../../WMInput';

export interface IDuplicateCourseDialog extends IWMConfirmationDialogWrapper {
  value: string;
}

export default function DuplicateCourseDialog({
  open,
  onCancel,
  onConfirm,
  value,
}: IDuplicateCourseDialog): ReactElement {
  const [localValue, setLocalValue] = useState(value);

  function onCourseNameChange(e: any) {
    setLocalValue(e.target.value);
  }

  return (
    <WMConfirmationDialog
      open={open}
      title="Duplicate this course"
      onCancel={onCancel}
      onConfirm={() => onConfirm(localValue)}
    >
      <WMInput value={localValue} onChange={onCourseNameChange} />
    </WMConfirmationDialog>
  );
}
