import React, { ReactElement, useState, useEffect } from 'react';

import { SplashScreen, ErrorScreen } from './components/Screen/';
import { appInitiator, defaultAppStatus, defaultAppGlobals } from './utils/app-utils';
import AppProvider from './providers/AppContext';
import Layout from './components/Layout';

export default function App(): ReactElement {
  const [status, setStatus] = useState(defaultAppStatus);
  const [globals, setGlobals] = useState(defaultAppGlobals);

  const { isLoading, hasError, errorMsg } = status;

  const setApp = async () => {
    const appInitStatus = await appInitiator();

    setStatus(appInitStatus);
    setGlobals(appInitStatus.globals);
  };

  useEffect(() => {
    setApp();
  }, []);

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : hasError ? (
        <ErrorScreen error={errorMsg} />
      ) : (
        <AppProvider globals={globals}>
          <Layout />
        </AppProvider>
      )}
    </>
  );
}
