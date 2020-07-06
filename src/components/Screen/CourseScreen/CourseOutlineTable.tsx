import React, { ReactElement } from 'react';
import { courseOutline } from '../../../constants/mocks/courseOutlineMock';

export default function CourseOutlineTable({ course }: { course: any }): ReactElement {
  console.log('courseOutline ', courseOutline);

  return <span>CourseOutlineTable</span>;
}
