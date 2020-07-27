import React, { ReactNode } from 'react';
import { message } from 'antd';

import Icon, { IconType } from '../../components/common/Icon';

import classes from './style.module.scss';

export const wmMessage = (content: ReactNode, type?: string): void => {
  switch (type) {
    case 'warning':
      message.warning({ content });
      break;
    case 'error':
      message.error({ content });
      break;
    default:
      message.success({
        content,
        className: classes['wm-message-success'],
        icon: <Icon type={IconType.Check} className={classes['icon-message']} />,
      });
  }
};
