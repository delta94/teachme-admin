import React, { ReactElement, useState } from 'react';

import { useCoursesContext, exportCourses } from '../../../providers/CoursesContext';

import { ExportToCSVDialog } from '../../common/dialogs';
import { ExportButton } from '../../common/buttons';

export default function ExportCoursesButton(): ReactElement {
  const [state, dispatch] = useCoursesContext();
  const {
    courses,
    dateRange: { from, to },
  } = state;

  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <ExportButton onClick={() => setShowExport(true)} />
      <ExportToCSVDialog
        coursesCount={courses.length}
        open={showExport}
        onCancel={() => setShowExport(false)}
        onConfirm={() => {
          setShowExport(false);
          exportCourses(dispatch, 0, from, to);
        }}
      />
    </>
  );
}