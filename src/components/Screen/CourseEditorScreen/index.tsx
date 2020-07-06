import React, { ReactElement } from 'react';

import WMCard from '../../common/WMCard';
import ScreenHeader from '../../common/ScreenHeader';

export default function CourseEditorScreen(): ReactElement {
  return (
    <>
      <ScreenHeader title="new-course" />
      <WMCard title="items" />
      <WMCard title="course" />
    </>
  );
}
