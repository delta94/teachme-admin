import React, { ReactElement } from 'react';
import cc from 'classcat';

import { useAppSkeleton } from '../../../../hooks/skeleton';

import Icon, { IconType } from '../../Icon';
import { WMSkeletonButton } from '../../WMSkeleton';
import WMButton from '../../WMButton';

import classes from './style.module.scss';

export default function ExportButton({
  className,
  onClick,
  disabled,
}: {
  className?: string;
  onClick?: () => void; // todo: make this required
  disabled?: boolean;
}): ReactElement {
  const appInit = useAppSkeleton();

  return (
    <>
      {appInit ? (
        <WMButton
          className={cc([classes['export-button'], className])}
          onClick={onClick}
          icon={<Icon type={IconType.FileExport} />}
          disabled={disabled}
        />
      ) : (
        <WMSkeletonButton className={classes['skeleton']} active shape="square" />
      )}
    </>
  );
}
