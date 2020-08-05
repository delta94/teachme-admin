import React, { ReactElement, useState } from 'react';

import { useCourseContext, exportCourse } from '../../../providers/CourseContext';

import { ExportToCSVDialog } from '../../common/dialogs';
import { ExportButton } from '../../common/buttons';

import classes from './style.module.scss';

export default function ExportCoursesButton(): ReactElement {
  const [state, dispatch] = useCourseContext();
  const {
    courseMetadata,
    dateRange: { from, to },
  } = state;

  const [showExport, setShowExport] = useState(false);

  return courseMetadata?.id ? (
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
  ) : (
    <></>
  );
}
