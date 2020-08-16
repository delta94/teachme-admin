import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import cc from 'classcat';

import { BASE_COURSE_EDITOR_ROUTE } from '../../../constants/routes';
import { useAppContext } from '../../../providers/AppContext';
import {
  ActionType,
  deleteCourses,
  fetchCoursesData,
  useCoursesContext,
} from '../../../providers/CoursesContext';
import { PublishStatus, UICourse } from '../../../walkme/data';
import { DeleteCourseDialog } from '../../common/dialogs';
import Icon, { IconType } from '../../common/Icon';
import { ITableCell } from '../../common/tableCells';
import WMButton from '../../common/WMButton';

import classes from './style.module.scss';

interface IActionsCell extends ITableCell {
  course: UICourse;
  className?: string;
}

export default function ActionsCell({
  course,
  className,
  ...otherProps
}: IActionsCell): ReactElement {
  const [
    {
      environment: { id: envId },
      dateRange: { from, to },
    },
  ] = useAppContext();
  const [{ isDeletingCourses }, dispatch] = useCoursesContext();
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const isPublished =
    course.publishStatus === PublishStatus.Published ||
    course.publishStatus === PublishStatus.Modified;

  return (
    <div className={cc([classes['actions-cell'], className])} {...otherProps}>
      <Link
        to={`${BASE_COURSE_EDITOR_ROUTE.path}/${course.id}`}
        className={classes['action-button']}
      >
        <WMButton icon={<Icon type={IconType.PencilSmall} />} />
      </Link>
      <WMButton
        onClick={() => setShowDeleteCourse(true)}
        icon={<Icon type={IconType.DeleteSmall} />}
        disabled={isPublished}
        className={cc([classes['action-button'], classes['delete-button']])}
      />
      <DeleteCourseDialog
        courses={[course]}
        open={showDeleteCourse}
        onCancel={() => setShowDeleteCourse(false)}
        onConfirm={async () => {
          dispatch({ type: ActionType.DeleteCourses });
          await deleteCourses(dispatch, [course]);
          setShowDeleteCourse(false);
          fetchCoursesData(dispatch, envId, from, to);
        }}
        isInProgress={isDeletingCourses}
      />
    </div>
  );
}
