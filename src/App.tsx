import React, { ReactElement, useState, useEffect } from 'react';

import { SplashScreen, ErrorScreen } from './components/Screen/';
import { appInitiator, defaultAppStatus } from './app-utils';
import AppProvider from './providers/AppContext';
import Layout from './components/Layout';

export default function App(): ReactElement {
  const [status, setStatus] = useState(defaultAppStatus);
  const { isLoading, hasError, errorMsg } = status;

  const setApp = async () => {
    const appInitStatus = await appInitiator();
    setStatus(appInitStatus);
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
        <AppProvider>
          <Layout />
        </AppProvider>
      )}
    </>
  );
}
