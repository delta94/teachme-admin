import React, { ReactElement, useState } from 'react';
import cc from 'classcat';

import { ActionType, useCourseEditorContext } from '../../../../providers/CourseEditorContext';
import WMButton from '../../../common/WMButton';

import Icon, { IconType } from '../../../common/Icon';
import classes from './style.module.scss';
import DeleteLessonDialog from './DeleteLessonDialog';

export default function LessonDeleteButton({
  lesson,
  showInput,
}: {
  lesson?: any;
  showInput: boolean;
}): ReactElement {
  const [{ course }, dispatch] = useCourseEditorContext();
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
