/* eslint max-len: ["error", { "code": 300 }] */
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk';
import axios from 'axios';
import { matchRoutes } from 'react-router-config';
import App from '../app';
import reducers from '../reducers';
import routes from '../routes';

// eslint-disable-next-line
if (__DEV__) {
  // Export React and Performance Utility for debugging
  window.React = React;
}
const axiosInstance = axios.create({
  baseURL: '/api',
});

const preloadedState = window.INITIAL_STATE;

// Allow the passed state to be garbage-collected
delete window.INITIAL_STATE;

const store = createStore(
  reducers,
  preloadedState,
  applyMiddleware(thunk.withExtraArgument(axiosInstance)),
);

let ServerPop = true;

const rootEl = document.getElementById('app');
const client = true;
const PendingNavDataLoader = withRouter((routings) => {
  if ((routings.history.action === 'POP' && !ServerPop) || (routings.history.action === 'PUSH' && !ServerPop)) {
    matchRoutes(routes, routings.history.location.pathname)
      .map(({ route }) => (route.loadData ? route.loadData(store) : null));
  }
  ServerPop = false;
  return routings.children;
});

ReactDom.hydrate(<AppContainer><Provider store={store}><BrowserRouter><PendingNavDataLoader routings={routes}><div><App client={client} /></div></PendingNavDataLoader></BrowserRouter></Provider></AppContainer>, rootEl);
