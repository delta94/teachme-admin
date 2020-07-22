import React, { ReactElement } from 'react';
import cc from 'classcat';

import WMButton from '../../WMButton';
import Icon, { IconType } from '../../Icon';

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
      {<Icon type={IconType.Plus} />}
    </WMButton>
  );
}
