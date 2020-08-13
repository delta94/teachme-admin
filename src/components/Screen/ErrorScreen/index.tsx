import React, { ReactElement, useState } from 'react';

import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

export default function ErrorScreen({ error }: { error?: string }): ReactElement {
  const [errorMessage, setErrorMessage] = useState(
    error && Boolean(error) ? error : 'Something went wrong',
  );

  return (
    <div className={classes['error-screen']}>
      <Icon type={IconType.EmptyError} />
      <h1>{errorMessage}</h1>
      <p>Please try again later</p>
    </div>
  );
}
