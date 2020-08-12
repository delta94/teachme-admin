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
  loading,
}: {
  className?: string;
  onClick?: () => void; // todo: make this required
  disabled?: boolean;
  loading?: boolean;
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
          loading={loading}
        />
      ) : (
        <WMSkeletonButton className={classes['skeleton']} active shape="square" />
      )}
    </>
  );
}
