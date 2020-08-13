// todo: ExportToCSVDialog is commented out until export to email is implemented

import React, { ReactElement /* , useState */ } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, exportCourse } from '../../../providers/CourseContext';

/* import { ExportToCSVDialog } from '../../common/dialogs'; */
import { ExportButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function ExportCoursesButton({ disabled }: { disabled?: boolean }): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
  } = appState;
  const [{ courseMetadata, isExportingCourse }, dispatch] = useCourseContext();

  /* const [showExport, setShowExport] = useState(false); */

  return (
    <>
      <ExportButton
        className={classes['export']}
        onClick={() => exportCourse(dispatch, courseMetadata?.id ?? 0, 0, from, to)}
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
