import React, { Dispatch, ReactElement, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { WalkMeEnvironment } from '@walkme/editor-sdk';

import { ActionType, fetchCourse } from '../../../providers/CourseEditorContext';
import { BASE_COURSE_EDITOR_ROUTE, COURSES_ROUTE } from '../../../constants/routes';
import { MessageType, wmMessage } from '../../../utils/wmMessage';
import { Course } from '../../../walkme/data/courseBuild/course';

import Icon, { IconType } from '../../common/Icon';
import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import CancelDialog from './CancelDialog';

import classes from './style.module.scss';

export interface IHeaderConfirmationButtonsProps {
  course: Course | null;
  hasChanges: boolean;
  isSavingCourse: boolean;
  environment: WalkMeEnvironment;
  dispatch: Dispatch<any>;
}

export default function HeaderConfirmationButtons({
  course,
  hasChanges,
  isSavingCourse,
  dispatch,
  environment,
}: IHeaderConfirmationButtonsProps): ReactElement {
  const history = useHistory();
  const { courseId } = useParams();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const isValid = course ? course?.isValid() : true;

  const addPreventInteractionClasses = () => {
    document.documentElement.classList.add(classes['prevent-interaction']);
    document.body.classList.add(classes['prevent-interaction']);
  };

  const removePreventInteractionClasses = () => {
    document.documentElement.classList.remove(classes['prevent-interaction']);
    document.body.classList.remove(classes['prevent-interaction']);
  };

  const onSave = () => {
    dispatch({ type: ActionType.SavingCourse });
    addPreventInteractionClasses();

    course
      ?.save()
      .then((): void => {
        removePreventInteractionClasses();
        dispatch({ type: ActionType.SavingCourseSuccess });
        wmMessage('Course saved successfully', MessageType.Success);

        if (!courseId) {
          history.replace(`${BASE_COURSE_EDITOR_ROUTE.path}/${course.id}`);
        }
      })
      .catch((e) => {
        removePreventInteractionClasses();
        wmMessage('Saving course failed, please try again', MessageType.Error);
        dispatch({ type: ActionType.SavingCourseFailure });
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
            disabled={!hasChanges || isSavingCourse}
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
            disabled={isSavingCourse}
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
        loading={isSavingCourse}
      >
        save
      </WMButton>
    </div>
  );
}
