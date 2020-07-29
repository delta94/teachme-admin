import React, { ReactElement } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { ActionType, useCourseEditorContext } from '../../../providers/CourseEditorContext';
import { BASE_COURSE_EDITOR_ROUTE, COURSES_ROUTE } from '../../../constants/routes';
import { MessageType, wmMessage } from '../../../utils/wmMessage';

import WMButton, { ButtonVariantEnum } from '../../common/WMButton';

import classes from './style.module.scss';

export default function HeaderConfirmationButtons(): ReactElement {
  const [{ course, hasChanges }, dispatch] = useCourseEditorContext();
  const history = useHistory();
  const { courseId } = useParams();

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

  return (
    <div className={classes['header-confirmation-buttons']}>
      <Link className={classes['create-button-wrapper']} to={COURSES_ROUTE.path}>
        <WMButton
          variant={ButtonVariantEnum.Secondary}
          shape={'round'}
          className={classes['cancel-button']}
        >
          cancel
        </WMButton>
      </Link>
      <WMButton
        variant={ButtonVariantEnum.Primary}
        shape={'round'}
        disabled={!hasChanges}
        onClick={onSave}
      >
        save
      </WMButton>
    </div>
  );
}
