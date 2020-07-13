import React, { ReactElement } from 'react';
import cc from 'classcat';

import Icon, { IconType } from '../../Icon';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function RefreshButton({
  className,
  onRefresh,
}: {
  className?: string;
  onRefresh: () => void;
}): ReactElement {
  return (
    <WMButton
      className={cc([classes['refresh-button'], className])}
      onClick={onRefresh}
      icon={<Icon type={IconType.Refresh} />}
    />
  );
}
