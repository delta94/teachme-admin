import React, { ReactElement } from 'react';

import { UICourse } from '../../../../walkme/data';

import WMConfirmationDialog, { IWMConfirmationDialogWrapper } from '../../WMConfirmationDialog';

import classes from './styles.module.scss';

export interface IDeleteCourseDialog extends IWMConfirmationDialogWrapper {
  courses: Array<UICourse>;
}

export default function DeleteCourseDialog({
  courses,
  open,
  onCancel,
  onConfirm,
}: IDeleteCourseDialog): ReactElement {
  return (
    <WMConfirmationDialog
      className={classes['delete-course-dialog']}
      open={open}
      title={`Delete Course${courses.length > 1 ? 's' : ''}`}
      confirmLabel="Delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <p>
        {'Are you sure you want to delete '}
        {courses.length > 1 ? (
          `${courses.length} courses`
        ) : (
          <>
            <span className={classes['bold']}>{courses[0]?.title}</span>
            {' course'}
          </>
        )}
        {'?'}
      </p>
    </WMConfirmationDialog>
  );
}
