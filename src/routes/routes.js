/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PATH from './PathConstants';
import LoadingPage from './LoadingPage';
import Authentication from './Authentication';

export const WaitingComponent = (Component) => (props) => (
  <Suspense fallback={<LoadingPage />}>
    <Component {...props} />
  </Suspense>
);

const appRoutes = [
  { path: PATH.PRODUCTMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Product/Product'))) },
  { path: PATH.ALBUMMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Album/Album'))) },
  { path: PATH.ACCOUNTMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Account/Account'))) },
];

const routes = () => (
  <Authentication>
    <Switch>
      <Route path={PATH.LOGIN} render={WaitingComponent(lazy(() => import('../modules/Login/Login')))} />
      <Route path={PATH.MAIN} render={WaitingComponent(lazy(() => import('../modules/MainPage/MainPage')))} />
    </Switch>
  </Authentication>
);

export const AppRoutes = () => (
  <Switch>
    {appRoutes.map((config) => <Route exact path={config.path} render={config.render} key={config.path} />)}
  </Switch>
);

export default routes;
