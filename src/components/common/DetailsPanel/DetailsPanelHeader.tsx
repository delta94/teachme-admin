import React, { ReactElement, ReactNode } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import WMButton from '../WMButton';

import classes from './style.module.scss';

export default function DetailsPanelHeader({
  onClose,
  title,
}: {
  onClose: () => void;
  title: ReactNode;
}): ReactElement {
  return (
    <div className={classes['details-panel-header']}>
      <span className={classes['details-panel-title']}>{title}</span>
      <WMButton className={classes['close']} onClick={onClose}>
        <CloseOutlined />
      </WMButton>
    </div>
  );
}
