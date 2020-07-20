import React, { ReactElement } from 'react';

import Logo from '../../common/Logo';

import classes from './style.module.scss';

export default function SplashScreen(): ReactElement {
  return (
    <div className={classes['splash-screen']}>
      <Logo />
    </div>
  );
}
