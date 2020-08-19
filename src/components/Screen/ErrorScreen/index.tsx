import React, { ReactElement, useState, useEffect } from 'react';

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

  return 'Unable to load TeachMe';
};

export default function ErrorScreen({ error }: { error?: any }): ReactElement {
  return (
    <div className={classes['error-screen']}>
      <Icon type={IconType.EmptyError} />
      <h1>{getErrorMessage(error)}</h1>
      <p>Please try again later</p>
    </div>
  );
}
