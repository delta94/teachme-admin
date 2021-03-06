import React, { Dispatch, ReactElement, useState } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { fetchCoursesData, deleteCourses, ActionType } from '../../../providers/CoursesContext';
import { PublishStatus } from '../../../walkme/models';
import { UICourse } from '../../../walkme/data';

import Icon, { IconType } from '../../common/Icon';
import WMButton from '../../common/WMButton';
import {
  DeleteCourseDialog,
  CantDeleteDialog, // TODO: remove 'delete' button from this dialog, disabled for now
} from '../../common/dialogs';

import classes from './style.module.scss';

function DeleteCoursesButton({
  selectedRows,
  isDeletingCourses,
  dispatch,
}: {
  selectedRows: Array<UICourse>;
  isDeletingCourses: boolean;
  dispatch: Dispatch<any>;
}): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
    environment: { id: envId },
  } = appState;

  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [showCantDeleteCourse, setShowCantDeleteCourse] = useState(false);

  const cannotDelete = selectedRows.some(
    (course: any) =>
      course.publishStatus === PublishStatus.Published ||
      course.publishStatus === PublishStatus.Modified,
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
        isInProgress={isDeletingCourses}
      />
      <CantDeleteDialog
        open={showCantDeleteCourse}
        onCancel={() => setShowCantDeleteCourse(false)}
        onConfirm={() => setShowCantDeleteCourse(false)}
      />
    </>
  );
}

export default React.memo(DeleteCoursesButton);
