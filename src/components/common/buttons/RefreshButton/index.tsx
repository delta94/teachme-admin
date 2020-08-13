import React, { ReactElement } from 'react';
import cc from 'classcat';

import Icon, { IconType } from '../../Icon';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function RefreshButton({
  className,
  onClick,
  loading,
}: {
  className?: string;
  onClick: () => void;
  loading?: boolean;
}): ReactElement {
  return (
    <WMButton
      className={cc([classes['refresh-button'], className])}
      onClick={onClick}
      icon={<Icon type={IconType.Refresh} />}
      loading={loading}
    />
  );
}
