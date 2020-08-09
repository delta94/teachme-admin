import React, { ReactElement, useState } from 'react';

import { useAppContext } from '../../../providers/AppContext';
import { useCourseContext, exportCourse } from '../../../providers/CourseContext';

import { ExportToCSVDialog } from '../../common/dialogs';
import { ExportButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function ExportCoursesButton(): ReactElement {
  const [appState] = useAppContext();
  const {
    dateRange: { from, to },
  } = appState;
  const [{ courseMetadata }, dispatch] = useCourseContext();

  const [showExport, setShowExport] = useState(false);

  return (
    <>
      {courseMetadata?.id && (
        <>
          <ExportButton className={classes['export']} onClick={() => setShowExport(true)} />
          <ExportToCSVDialog
            coursesCount={1}
            open={showExport}
            onCancel={() => setShowExport(false)}
            onConfirm={() => {
              setShowExport(false);
              exportCourse(dispatch, courseMetadata?.id, 0, from, to);
            }}
          />
        </>
      )}
    </>
  );
}
