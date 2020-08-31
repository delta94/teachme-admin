import React, { Dispatch, ReactElement, useState } from 'react';
import cc from 'classcat';

import { Course } from '../../../../walkme/data/courseBuild/course';
import { ActionType } from '../../../../providers/CourseEditorContext';
import WMButton from '../../../common/WMButton';

import Icon, { IconType } from '../../../common/Icon';
import classes from './style.module.scss';
import DeleteLessonDialog from './DeleteLessonDialog';

export default function LessonDeleteButton({
  lesson,
  showInput,
  course,
  dispatch,
}: {
  lesson?: any;
  showInput: boolean;
  course: Course | null;
  dispatch: Dispatch<any>;
}): ReactElement {
  const [openDialog, setOpenDialog] = useState(false);

  const deleteLesson = () => {
    course?.items.removeItem(lesson);
    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: true });
    setOpenDialog(false);
  };

  const onClickDelete = () => {
    if (lesson.childNodes.toArray().length > 0) {
      setOpenDialog(true);
    } else {
      deleteLesson();
    }
  };

  return (
    <>
      <WMButton
        onClick={onClickDelete}
        className={cc([classes['title-button'], { [classes['hidden']]: showInput }])}
      >
        <Icon type={IconType.Delete} className={classes['title-icon']} />
      </WMButton>
      <DeleteLessonDialog
        open={openDialog}
        onCancel={() => setOpenDialog(false)}
        onConfirm={deleteLesson}
      />
    </>
  );
}
