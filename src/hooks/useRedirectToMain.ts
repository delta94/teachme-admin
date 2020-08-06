import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePrevious from '@react-hook/previous';

import { useAppContext } from '../providers/AppContext';
import { COURSES_ROUTE } from '../constants/routes';

export const useRedirectToMain = (): void => {
  const [{ system }] = useAppContext();
  const prevSystem = usePrevious(system);
  const { push } = useHistory();

  useEffect(() => {
    if (prevSystem && prevSystem.userId !== system.userId) push(COURSES_ROUTE.path);
  }, [prevSystem, system, push]);
};
