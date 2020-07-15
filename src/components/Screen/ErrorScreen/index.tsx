import React, { ReactElement, useState } from 'react';

import classes from './style.module.scss';

export default function ErrorScreen({ error }: { error?: string }): ReactElement {
  const [errorMessage, setErrorMessage] = useState(
    error && Boolean(error) ? error : 'Something Wrong',
  );

  return (
    <div className={classes['error-screen']}>
      <p>{errorMessage}</p>
    </div>
  );
}
