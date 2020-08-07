import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/'} component={HomePage} exact={true} />
      <Route path={'/signup'} component={SignUpPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;