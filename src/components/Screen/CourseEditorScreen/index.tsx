import React, { ReactElement, useState } from 'react';

import WMCard from '../../common/WMCard';
import EditableTitle from '../../common/  EditableTitle';

export default function CourseEditorScreen(): ReactElement {
  const [courseTitle, setCourseTitle] = useState('Untitled Course');

  const onBlur = (text: string) => {
    setCourseTitle(text);
  };

  return (
    <>
      <EditableTitle onBlur={onBlur} value={courseTitle} />
      <WMCard title="items" />
      <WMCard title="course" />
    </>
  );
}
