import React, { ReactElement } from 'react';

import { Divider } from 'antd';
import TextCounter from '../../../common/TextCounterInput';

import TextCounterTextarea from '../../../common/TextCounterTextarea';

import classes from '../../../common/TextCounterInput/style.module.scss';

export default function Counter(): ReactElement {
  return (
    <>
      <TextCounter
        maxLength={12}
        placeholder="Text"
        label="Title"
        onChange={(eventhandler) => console.log(eventhandler)}
      />
      <Divider />
      <div className={classes['text-counter-input']}>
        <label htmlFor="input-with-counter" className={classes['input-label']}>
          Minimal (label is external)
        </label>
      </div>
      <TextCounter id="input-with-counter" />
      <Divider />
      <TextCounterTextarea
        maxLength={32}
        placeholder="Text"
        label="Description"
        minRows={15}
        maxRows={25}
        onChange={(eventhandler) => console.log(eventhandler)}
      />
    </>
  );
}
