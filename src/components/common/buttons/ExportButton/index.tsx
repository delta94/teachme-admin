import React, { ReactElement, useState, useEffect } from 'react';
import cc from 'classcat';

import { useAppContext } from '../../../../providers/AppContext';

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
  const [appState, appDispatch] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);
  return (
    <>
      {appInit ? (
        <WMButton
          className={cc([classes['export-button'], className])}
          onClick={onClick}
          icon={<Icon type={IconType.FileExport} />}
        />
      ) : (
        <WMSkeletonButton active shape="square" />
      )}
    </>
  );
}
