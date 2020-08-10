import React, { ReactElement, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { useAppContext } from '../../../providers/AppContext';
import {
  ActionType,
  fetchCourse,
  useCourseEditorContext,
} from '../../../providers/CourseEditorContext';
import { BASE_COURSE_EDITOR_ROUTE, COURSES_ROUTE } from '../../../constants/routes';
import { MessageType, wmMessage } from '../../../utils/wmMessage';

import Icon, { IconType } from '../../common/Icon';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import classes from './style.module.scss';
import CancelDialog from './CancelDialog';

export default function HeaderConfirmationButtons(): ReactElement {
  const [{ course, hasChanges }, dispatch] = useCourseEditorContext();
  const [{ environment }, appDispatch] = useAppContext();
  const history = useHistory();
  const { courseId } = useParams();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const isValid = course ? course?.isValid() : true;

  const onSave = () => {
    course
      ?.save()
      .then((): void => {
        dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: false });
        wmMessage('Course saved successfully', MessageType.Success);

        if (!courseId) {
          history.replace(`${BASE_COURSE_EDITOR_ROUTE.path}/${course.id}`);
        }
      })
      .catch((e) => {
        wmMessage('Saving course failed, please try again', MessageType.Error);
        console.error(e);
      });
  };

  const onCancel = () => {
    fetchCourse(dispatch, courseId, environment.id, history);
    dispatch({ type: ActionType.UpdateCourseOutline, updateHasChange: false });
    setOpenCancelDialog(false);
  };

  const showCancelButton = !!courseId;

  return (
    <div className={classes['header-confirmation-buttons']}>
      {!isValid && (
        <div className={classes['error-message']}>
          <Icon type={IconType.ValidationError} /> There are items that require your attention
        </div>
      )}

      {showCancelButton ? (
        <>
          <WMButton
            variant={ButtonVariantEnum.Secondary}
            shape={'round'}
            className={classes['cancel-button']}
            disabled={!hasChanges}
            onClick={() => setOpenCancelDialog(true)}
          >
            Cancel
          </WMButton>
          <CancelDialog
            open={openCancelDialog}
            onConfirm={onCancel}
            onCancel={() => setOpenCancelDialog(false)}
          />
        </>
      ) : (
        <Link className={classes['create-button-wrapper']} to={COURSES_ROUTE.path}>
          <WMButton
            variant={ButtonVariantEnum.Secondary}
            shape={'round'}
            className={classes['cancel-button']}
          >
            Back to course list
          </WMButton>
        </Link>
      )}

      <WMButton
        variant={ButtonVariantEnum.Primary}
        shape={'round'}
        disabled={!hasChanges || !isValid}
        onClick={onSave}
      >
        save
      </WMButton>
    </div>
  );
}
