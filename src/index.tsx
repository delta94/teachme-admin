import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { appInitiator } from './app-utils';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './styles/index.scss';

(async () => {
  const { isLoading, hasError } = await appInitiator();

  ReactDOM.render(
    <StrictMode>
      {/* TODO: Create a loading screen + error screen */}
      {isLoading && <div>LOADING</div>}
      {hasError && <div>ERROR</div>}
      {!hasError && !isLoading && <App />}
    </StrictMode>,
    document.getElementById('root'),
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
