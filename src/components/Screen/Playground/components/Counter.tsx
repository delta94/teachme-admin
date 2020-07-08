import React, { ReactElement } from 'react';

import { Divider } from 'antd';
import TextCounter from '../../../common/TextCounter';

export default function Counter(): ReactElement {
  return (
    <>
      <TextCounter maxLength={15} value="Hello!" />
      <Divider />
    </>
  );
}
