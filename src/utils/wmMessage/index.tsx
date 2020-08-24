import React, { ReactNode } from 'react';
import { message } from 'antd';

import Icon, { IconType } from '../../components/common/Icon';

import classes from './style.module.scss';

export enum MessageType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export const wmMessage = (content: ReactNode, type = MessageType.Success): void => {
  switch (type) {
    case MessageType.Warning:
      message.warning({ content });
      break;
    case MessageType.Error:
      message.error({ content });
      break;
    case MessageType.Success:
      message.success({
        content,
        icon: <Icon type={IconType.Check} className={classes['icon']} />,
      });
      break;
    default:
      throw new Error(`Unhandled message type: ${type}`);
  }
};
