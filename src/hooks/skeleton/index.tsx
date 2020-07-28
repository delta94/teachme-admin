import { useState, useEffect } from 'react';
import { useAppContext } from '../../providers/AppContext';

export const useAppSkeleton = (): boolean => {
  const [appState] = useAppContext();
  const { isUpdating } = appState;
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    if (!isUpdating && !appInit) setAppInit(true);
  }, [isUpdating, appInit]);

  return appInit;
};
