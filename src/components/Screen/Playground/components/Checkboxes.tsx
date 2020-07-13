import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import WMCheckbox from '../../../common/WMCheckbox';
import Header from '../../../common/Header';

export default function Checkboxes(): ReactElement {
  return (
    <>
      <Header title="wm-checkbox without label" />
      <WMCheckbox />
      <Divider />
      <Header title="wm-checkbox with label" />
      <WMCheckbox>label</WMCheckbox>
      <Divider />
    </>
  );
}
