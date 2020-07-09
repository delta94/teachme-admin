import React, { ReactElement } from 'react';

import { Divider } from 'antd';
import TextCounter from '../../../common/TextCounterInput';
import TextCounterTextarea from '../../../common/TextCounterTextarea';

export default function Counter(): ReactElement {
  return (
    <>
      <TextCounter
        maxLength={12}
        placeholder="Text"
        label="Title"
        onChange={(text) => console.log(text)}
      />
      <Divider />
      <TextCounter
        maxLength={25}
        placeholder="Start Quiz"
        label="Button"
        onChange={(text) => console.log(text)}
      />
      <Divider />
      <TextCounterTextarea
        maxLength={32}
        placeholder="Text"
        label="Description"
        minRows={15}
        maxRows={25}
        onChange={(text) => console.log(text)}
      />
    </>
  );
}
