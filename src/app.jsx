import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import route from './routes';

export default () => (
  <Switch>
    {renderRoutes(route)}
  </Switch>
);
