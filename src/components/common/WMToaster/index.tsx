import React, { ReactElement } from 'react';
import { message, Button, Space } from 'antd';

import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

export default function WMToaster({
  number = '',
  text,
  buttonName,
}: {
  number?: string;
  text: string;
  buttonName: string;
}): ReactElement {
  const onClick = () => {
    message.success({
      content: `${number} ${text}`,
      className: classes['wm-toaster'],
      icon: <Icon type={IconType.Check} className={classes['icon-message']} />,
    });
  };

  return (
    <Space>
      <Button onClick={onClick}>{buttonName}</Button>
    </Space>
  );
}
