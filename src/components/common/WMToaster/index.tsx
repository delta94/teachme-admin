import React, { ReactElement } from 'react';
import { message, Button, Space } from 'antd';

import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

export default function Toaster({
  number = '',
  text,
  buttonName,
}: {
  number?: string;
  text: string;
  buttonName: string;
}): ReactElement {
  const success = () => {
    message.success({
      content: `${number} ${text}`,
      className: classes['toaster-message'],
      icon: <Icon type={IconType.Message} className={classes['icon-message']} />,
    });
  };

  return (
    <>
      <Space>
        <Button onClick={success}>{buttonName}</Button>
      </Space>
    </>
  );
}
