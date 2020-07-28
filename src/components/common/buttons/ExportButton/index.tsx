import React, { ReactElement } from 'react';
import cc from 'classcat';

import { useAppSkeleton } from '../../../../Hook';

import Icon, { IconType } from '../../Icon';
import { WMSkeletonButton } from '../../WMSkeleton';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function ExportButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void; // todo: make this required
}): ReactElement {
  const appInit = useAppSkeleton();

  return (
    <div className={classes['export-button']}>
      {appInit ? (
        <WMButton
          className={cc([classes['export-wmbutton'], className])}
          onClick={onClick}
          icon={<Icon type={IconType.FileExport} />}
        />
      ) : (
        <WMSkeletonButton active shape="square" />
      )}
    </div>
  );
}
