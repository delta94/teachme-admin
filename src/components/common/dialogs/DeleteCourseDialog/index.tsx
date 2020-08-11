import React, { ReactElement } from 'react';

import { UICourse } from '../../../../walkme/data';
import { pluralizer } from '../../../../utils';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

import DialogContent from './DialogContent';
import classes from './styles.module.scss';

export interface IDeleteCourseDialog extends IWMConfirmationDialogWrapper {
  courses: Array<UICourse>;
  isInProgress?: boolean;
}

export default function DeleteCourseDialog({
  courses,
  open,
  onCancel,
  onConfirm,
  isInProgress,
}: IDeleteCourseDialog): ReactElement {
  return (
    <WMConfirmationDialog
      className={classes['delete-course-dialog']}
      open={open}
      title={`Delete ${pluralizer('Course', courses.length)}`}
      confirmLabel="Delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
      loadingConfirmButton={isInProgress}
      disableDialog={isInProgress}
    >
      <DialogContent courses={courses} />
    </WMConfirmationDialog>
  );
}
