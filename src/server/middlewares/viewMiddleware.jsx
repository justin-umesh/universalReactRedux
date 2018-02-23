/* eslint max-len: ["error", { "code": 200 }] */
import 'babel-polyfill';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';

// Local dependencies
import App from '../../app';
import routes from '../../routes';
import configureStore from '../../store/configureStore';
import Html from '../../components/Html';

function renderHtml(req, store, context) {
  const initalState = store.getState();
  const content = renderToString(<Provider store={store}><StaticRouter context={context} location={req.url} ><App /></StaticRouter></Provider>);
  const markup = renderToStaticMarkup(<Html content={content} initalState={initalState} />);
  return `<!doctype html>${markup}`;
}

function handleRequests(req, res) {
  // res.send({ Hey: `Umesh${req.path}` });
  const store = configureStore(req);
  const promises = matchRoutes(routes, req.url)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const html = renderHtml(req, store, context);
    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      // res.stream.respond({ ':status': 301 });
      res.writeHead(301, {
        Location: context.url,
      });
      res.send(html);
      res.redirect(301, context.url);
    }
    if (context.notFound) {
      console.log('404 found issue');
      res.send(404, {
        Location: context.url,
      });
    }
    res.send(html);
  });
}

export default handleRequests;
