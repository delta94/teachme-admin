import React from 'react';
import ReactDOM from 'react-dom';
import walkme from '@walkme/editor-sdk';
import './walkme';

import * as serviceWorker from './serviceWorker';

import App from './App';

import './styles/index.scss';
async function run() {
  await walkme.auth.init({
    client_id: '9df1e0b762fd4e87bb271fcd88124323',
    redirect_uri: 'http://localhost:7000/#&',
    post_logout_redirect_uri: 'http://localhost:7000/#&',
  });

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
