import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { api, auth, routes, notifier, pubnub, storage } from './lib';
import { WithRoutes, WithErrorBoundary } from './ecosystems';

const props = {
  api,
  auth,
  routes,
  notifier,
  pubnub,
  storage
};

const AppWithErrorBoundary = () => (
  <WithErrorBoundary>
    <WithRoutes {...props} />
  </WithErrorBoundary>
);

ReactDOM.render(<AppWithErrorBoundary />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
