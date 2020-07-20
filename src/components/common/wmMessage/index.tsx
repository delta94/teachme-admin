import React from 'react';
import { message } from 'antd';

import Icon, { IconType } from '../Icon';

import classes from './style.module.scss';

export const wmMessageSuccess = (content: string): void => {
  message.success({
    content,
    className: classes['wm-message-success'],
    icon: <Icon type={IconType.Check} className={classes['icon-message']} />,
  });
};
