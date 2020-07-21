import React, { ReactElement, ReactNode } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import WMButton from '../WMButton';

import classes from './style.module.scss';

export default function DetailsPanelHeader({
  onClose,
  title,
  icon,
}: {
  onClose: () => void;
  title: ReactNode;
  icon?: ReactNode;
}): ReactElement {
  return (
    <div className={classes['details-panel-header']}>
      {icon}
      <span className={classes['details-panel-title']}>{title}</span>
      <WMButton className={classes['close']} onClick={onClose}>
        <CloseOutlined />
      </WMButton>
    </div>
  );
}
