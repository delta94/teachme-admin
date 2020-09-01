// todo: ExportToCSVDialog is commented out until export to email is implemented

import React, { Dispatch, ReactElement } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { exportCourses } from '../../../providers/CoursesContext';

import { ExportButton } from '../../common/buttons';

function ExportCoursesButton({
  disabled,
  isExportingCourses,
  dispatch,
}: {
  disabled?: boolean;
  isExportingCourses: boolean;
  dispatch: Dispatch<any>;
}): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
    environment: { id: envId },
  } = appState;

  // const [showExport, setShowExport] = useState(false);

  return (
    <>
      <ExportButton
        onClick={() => exportCourses(dispatch, envId, from, to)}
        disabled={disabled}
        loading={isExportingCourses}
      />
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

export default React.memo(ExportCoursesButton);
