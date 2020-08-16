import React, { ReactElement, useState } from 'react';

import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

const getErrorMessage = (error: any) => {
  if (error) {
    if (typeof error === 'string') {
      return error;
    }

    if (typeof error.message === 'string') {
      return error.message;
    }
  }

  return 'Something went wrong';
};

export default function ErrorScreen({ error }: { error?: string }): ReactElement {
  const errorMessage = getErrorMessage(error);

  return (
    <div className={classes['error-screen']}>
      <Icon type={IconType.EmptyError} />
      <h1>{errorMessage}</h1>
      <p>Please try again later</p>
    </div>
  );
}
