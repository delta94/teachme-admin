import React, { ReactElement } from 'react';
import { Divider } from 'antd';

import { ReactComponent as LogoIcon } from '../../../../images/logo.svg';

import classes from './style.module.scss';

export default function Top(): ReactElement {
  return (
    <div className={classes.top}>
      <div className={classes.logo}>
        <span>TEACH</span>
        <LogoIcon />
      </div>
      <Divider className={classes['top-separator']} />
    </div>
  );
}
