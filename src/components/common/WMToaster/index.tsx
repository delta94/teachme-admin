import React, { ReactElement } from 'react';
import { message, Button, Space } from 'antd';

import Icon, { IconType } from '../../common/Icon';

import classes from './style.module.scss';

export default function Toaster({
  course = '',
  text,
}: {
  course?: string;
  text: string;
}): ReactElement {
  const success = () => {
    message.success({
      content: `${course} ${text}`,
      className: classes['publish-message'],
      icon: <Icon type={IconType.Message} className={classes['icon-message']} />,
    });
  };

  return (
    <>
      <Space>
        <Button onClick={success}>Button</Button>
      </Space>
    </>
  );
}
