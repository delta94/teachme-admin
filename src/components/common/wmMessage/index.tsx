import React, { ReactNode } from 'react';
import { message } from 'antd';

import Icon, { IconType } from '../Icon';

import classes from './style.module.scss';

export const wmMessage = (content: ReactNode, type?: string): void => {
  switch (type) {
    case 'warning':
      message.warning({
        content,
        className: classes['wm-message-warning'],
      });
      break;
    case 'error':
      message.error({
        content,
        className: classes['wm-message-error'],
      });
      break;

    default:
      message.success({
        content,
        className: classes['wm-message-success'],
        icon: <Icon type={IconType.Check} className={classes['icon-message']} />,
      });
  }
};
