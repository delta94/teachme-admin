import React, { ReactNode, ReactElement } from 'react';

import classes from './style.module.scss';

export default function ControlsWrapper({ children }: { children: ReactNode }): ReactElement {
  return <div className={classes['controls-wrapper']}>{children}</div>;
}
