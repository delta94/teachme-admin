import React, { ReactNode, ReactElement } from 'react';
import cc from 'classcat';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

import Header from '../Header';

import classes from './style.module.scss';

export interface IWMCardProps extends CardProps {
  title?: ReactNode;
  className?: string;
  subTitle?: ReactNode;
  children?: ReactNode;
}

export default function WMCard({
  title,
  subTitle,
  className,
  children,
  ...otherProps
}: IWMCardProps): ReactElement {
  return (
    <Card className={cc([classes['wm-card'], className])} {...otherProps}>
      {title && (
        <Header title={title}>
          <div className={classes['card-subtitle']}>{subTitle}</div>
        </Header>
      )}
      {children}
    </Card>
  );
}
