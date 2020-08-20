import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashBoardPage from '../pages/DashBoardPage';
import HomePage from '../pages/HomePage';
import MyListPage from '../pages/MyListPage';
import PlatformPage from '../pages/PlatformPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/dashboard" component={DashBoardPage} />
      <Route path="/nintendo" component={PlatformPage} />
      <Route path="/playstation" component={PlatformPage} />
      <Route path="/xbox" component={PlatformPage} />
      <Route path="/pc" component={PlatformPage} />
      <Route path="/list" component={MyListPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
