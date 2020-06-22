import React, { ReactElement } from 'react';
import { Card } from 'antd';

import classes from './style.module.css';

export type PropTypes = { props?: any; children?: React.ReactNode };

export default function App({ props, children }: PropTypes): ReactElement {
  return (
    <Card className={classes['wm-card']} {...props}>
      {children}
    </Card>
  );
}
