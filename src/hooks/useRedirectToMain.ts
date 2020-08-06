import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SystemData } from '@walkme/editor-sdk/dist/system';
import usePrevious from '@react-hook/previous';

import { useAppContext } from '../providers/AppContext';
import { COURSES_ROUTE } from '../constants/routes';

export const useRedirectToMain = (): void => {
  const [{ system }] = useAppContext();
  const prevSystem = usePrevious(system);
  const { push } = useHistory();

  useEffect(() => {
    const isValidSystem =
      prevSystem &&
      prevSystem !== '' &&
      (prevSystem as SystemData)?.userId !== (system as SystemData)?.userId;

    if (isValidSystem) push(COURSES_ROUTE.path);
  }, [prevSystem, system, push]);
};
