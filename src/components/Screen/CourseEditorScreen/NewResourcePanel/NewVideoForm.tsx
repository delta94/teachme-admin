import React, { ReactElement } from 'react';
import TextCounterInput from '../../../common/TextCounterInput';

import classes from './style.module.scss';

export default function NewVideoForm(): ReactElement {
  return (
    <div className={classes['new-video-form']}>
      <TextCounterInput
        maxLength={80}
        placeholder="Read this"
        label="Name"
        onBlur={(e) => {
          console.log('URL onBlur e => ', e);
        }}
      />
      <TextCounterInput
        maxLength={80}
        placeholder="http://"
        label="URL"
        onBlur={(e) => {
          console.log('URL onBlur e => ', e);
        }}
      />
    </div>
  );
}
