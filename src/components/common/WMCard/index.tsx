import React, { ReactElement } from 'react';
import { Card } from 'antd';
import { CardInterface } from 'antd/lib/card';

import Header from '../Header';

import classes from './style.module.scss';

export type PropTypes = {
  title?: ReactElement | string;
  subTitle?: ReactElement | string;
  props?: CardInterface;
  children?: React.ReactNode;
};

export default function WMCard({ title, subTitle, props, children }: PropTypes): ReactElement {
  return (
    <Card className={classes['wm-card']} {...props}>
      {title && (
        <Header title={title}>
          {subTitle && <div className={classes['card-subtitle']}>{subTitle}</div>}
        </Header>
      )}
      {children}
    </Card>
  );
}
