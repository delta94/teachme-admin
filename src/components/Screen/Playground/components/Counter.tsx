import React, { ReactElement } from 'react';

import { Divider } from 'antd';
import TextCounter from '../../../common/TextCounter';

export default function Counter(): ReactElement {
  return (
    <>
      <TextCounter maxLength={12} placeholder="Text" label="Title" />
      <Divider />
      <TextCounter maxLength={25} placeholder="Start Quiz" label="Button" />
      <Divider />
    </>
  );
}
