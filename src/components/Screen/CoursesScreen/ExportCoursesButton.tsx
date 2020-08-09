// todo: ExportToCSVDialog is commented out until export to email is implemented

import React, { ReactElement /* , useState */ } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { useCoursesContext, exportCourses } from '../../../providers/CoursesContext';

// import { ExportToCSVDialog } from '../../common/dialogs';
import { ExportButton } from '../../common/buttons';

export default function ExportCoursesButton({ disabled }: { disabled?: boolean }): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
  } = appState;
  const [, dispatch] = useCoursesContext();

  // const [showExport, setShowExport] = useState(false);

  return (
    <>
      <ExportButton onClick={() => exportCourses(dispatch, 0, from, to)} disabled={disabled} />
      {/* <ExportToCSVDialog
        coursesCount={courses.length}
        open={showExport}
        onCancel={() => setShowExport(false)}
        onConfirm={() => {
          setShowExport(false);
          exportCourses(dispatch, 0, from, to);
        }}
      /> */}
    </>
  );
}
