import React, { ReactElement, ReactNode } from 'react';
import cc from 'classcat';
import { CloseOutlined } from '@ant-design/icons';

import WMButton from '../WMButton';

import classes from './style.module.scss';

export default function DetailsPanelHeader({
  onClose,
  title,
  icon,
  isEllipsis,
}: {
  onClose: () => void;
  title: ReactNode;
  icon?: ReactNode;
  isEllipsis?: boolean;
}): ReactElement {
  return (
    <div className={classes['details-panel-header']}>
      {icon}
      <span className={cc([classes['details-panel-title'], { [classes['ellipsis']]: isEllipsis }])}>
        {title}
      </span>
      <WMButton className={classes['close']} onClick={onClose}>
        <CloseOutlined />
      </WMButton>
    </div>
  );
}
