// todo: ExportToCSVDialog is commented out until export to email is implemented

import React, { Dispatch, ReactElement, useCallback } from 'react';

import { exportCourse } from '../../../providers/CourseContext';
import { CourseMetadata } from '../../../walkme/models/course';

/* import { ExportToCSVDialog } from '../../common/dialogs'; */
import { ExportButton } from '../../common/buttons';

import classes from './style.module.scss';

interface IExportCoursesButtonProps {
  disabled?: boolean;
  courseMetadata?: CourseMetadata;
  isExportingCourse: boolean;
  envId: number;
  from: string;
  to: string;
  dispatch: Dispatch<any>;
}

function ExportCoursesButton({
  disabled,
  courseMetadata,
  isExportingCourse,
  envId,
  from,
  to,
  dispatch,
}: IExportCoursesButtonProps): ReactElement {
  /* const [showExport, setShowExport] = useState(false); */
  const exportCoursesOnClick = useCallback(
    () => exportCourse(dispatch, courseMetadata?.id ?? 0, envId, from, to),
    [dispatch, courseMetadata?.id, envId, from, to],
  );
  return (
    <>
      <ExportButton
        className={classes['export']}
        onClick={exportCoursesOnClick}
        disabled={disabled}
        loading={isExportingCourse}
      />
      {/* <ExportToCSVDialog
            coursesCount={1}
            open={showExport}
            onCancel={() => setShowExport(false)}
            onConfirm={() => {
              setShowExport(false);
              exportCourse(dispatch, courseMetadata?.id, 0, from, to);
            }}
          /> */}
    </>
  );
}

export default React.memo(ExportCoursesButton);
