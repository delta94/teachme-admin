import React, { ReactElement } from 'react';
import cc from 'classcat';

import Icon, { IconType } from '../../Icon';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function ExportButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void; // todo: make this required
}): ReactElement {
  return (
    <WMButton
      className={cc([classes['export-button'], className])}
      onClick={onClick}
      icon={<Icon type={IconType.FileExport} />}
    />
  );
}
