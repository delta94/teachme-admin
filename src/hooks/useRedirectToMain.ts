import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePrevious from '@react-hook/previous';
import isEmpty from 'lodash/isEmpty';
import { SystemData } from '@walkme/editor-sdk/dist/system';

import { useAppContext } from '../providers/AppContext';
import { COURSES_ROUTE } from '../constants/routes';

export const useRedirectToMain = (): void => {
  const [{ system }] = useAppContext();
  const prevSystem = usePrevious(system);
  const { push } = useHistory();

  useEffect(() => {
    const changedSystem =
      prevSystem &&
      !isEmpty(prevSystem) &&
      (prevSystem as SystemData)?.userId !== (system as SystemData)?.userId;

    if (changedSystem) push(COURSES_ROUTE.path);
  }, [prevSystem, system, push]);
};
