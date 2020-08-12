import React, { ReactElement } from 'react';

import { ReactComponent as LogoIcon } from '../../../images/logo.svg';

import classes from './style.module.scss';

export default function Logo(): ReactElement {
  return (
    <div className={classes.logo}>
      <LogoIcon />
    </div>
  );
}
