// todo: ExportToCSVDialog is commented out until export to email is implemented

import React, { ReactElement /* , useState */ } from 'react';

import { useCourseContext, exportCourse } from '../../../providers/CourseContext';

/* import { ExportToCSVDialog } from '../../common/dialogs'; */
import { ExportButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function ExportCoursesButton({ disabled }: { disabled?: boolean }): ReactElement {
  const [state, dispatch] = useCourseContext();
  const {
    courseMetadata,
    dateRange: { from, to },
  } = state;

  /* const [showExport, setShowExport] = useState(false); */

  return (
    <>
      <ExportButton
        className={classes['export']}
        onClick={() => exportCourse(dispatch, courseMetadata?.id ?? 0, 0, from, to)}
        disabled={disabled}
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
