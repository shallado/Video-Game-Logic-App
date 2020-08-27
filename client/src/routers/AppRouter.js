import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AccountPage from '../pages/AccountPage';
import DashBoardPage from '../pages/DashBoardPage';
import HomePage from '../pages/HomePage';
import MyListPage from '../pages/MyListPage';
import PlatformPage from '../pages/PlatformPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/" component={HomePage} exact={true} />
      <PrivateRoute path="/account" component={AccountPage} />
      <PrivateRoute path="/dashboard" component={DashBoardPage} />
      <PrivateRoute path="/nintendo" component={PlatformPage} />
      <PrivateRoute path="/playstation" component={PlatformPage} />
      <PrivateRoute path="/xbox" component={PlatformPage} />
      <PrivateRoute path="/pc" component={PlatformPage} />
      <PrivateRoute path="/list" component={MyListPage} />
      <PublicRoute path="/signin" component={SignInPage} />
      <PublicRoute path="/signup" component={SignUpPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
