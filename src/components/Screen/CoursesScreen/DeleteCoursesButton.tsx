import React, { ReactElement, useState } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import {
  useCoursesContext,
  fetchCoursesData,
  deleteCourses,
  ActionType,
} from '../../../providers/CoursesContext';
import { PublishStatus } from '../../../walkme/models';

import Icon, { IconType } from '../../common/Icon';
import WMButton from '../../common/WMButton';
import {
  DeleteCourseDialog,
  CantDeleteDialog, // TODO: remove 'delete' button from this dialog, disabled for now
} from '../../common/dialogs';

import classes from './style.module.scss';

export default function DeleteCoursesButton(): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
    environment: { id: envId },
  } = appState;
  const [{ selectedRows, isDeletingCourses }, dispatch] = useCoursesContext();

  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [showCantDeleteCourse, setShowCantDeleteCourse] = useState(false);

  const cannotDelete = selectedRows.some(
    (course) => course.publishStatus === PublishStatus.Published,
  );

  const onDeleteCourse = () => {
    if (cannotDelete) setShowCantDeleteCourse(true);
    else setShowDeleteCourse(true);
  };

  return (
    <>
      <WMButton
        className={classes['delete-courses-button']}
        icon={<Icon type={IconType.Delete} />}
        onClick={onDeleteCourse}
      />
      <DeleteCourseDialog
        courses={selectedRows}
        open={showDeleteCourse}
        onCancel={() => setShowDeleteCourse(false)}
        onConfirm={async () => {
          dispatch({ type: ActionType.DeleteCourses });
          await deleteCourses(dispatch, selectedRows);
          setShowDeleteCourse(false);
          fetchCoursesData(dispatch, envId, from, to);
        }}
        isInProgess={isDeletingCourses}
      />
      <CantDeleteDialog
        open={showCantDeleteCourse}
        onCancel={() => setShowCantDeleteCourse(false)}
        onConfirm={() => setShowCantDeleteCourse(false)}
      />
    </>
  );
}
