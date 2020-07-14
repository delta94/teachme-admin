import React, { ReactElement } from 'react';
import cc from 'classcat';

import { PlusOutlined } from '@ant-design/icons';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function AddButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}): ReactElement {
  return (
    <WMButton className={cc([classes['add-button'], className])} onClick={onClick}>
      <PlusOutlined />
    </WMButton>
  );
}
