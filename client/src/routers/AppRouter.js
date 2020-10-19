import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AccountPage from '../pages/AccountPage';
import DashBoardPage from '../pages/DashBoardPage';
import HomePage from '../pages/HomePage';
import MyListPage from '../pages/MyListPage';
import PlatformPage from '../pages/PlatformPage';
import SearchPage from '../pages/SearchPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import UploadImagePage from '../pages/UploadImagePage';
import WatchPage from '../pages/WatchPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/" component={HomePage} exact={true} />
      <PublicRoute path="/signin" component={SignInPage} />
      <PublicRoute path="/signup" component={SignUpPage} />
      <PrivateRoute path="/account" component={AccountPage} />
      <PrivateRoute path="/dashboard" component={DashBoardPage} />
      <PrivateRoute path="/nintendo" component={PlatformPage} />
      <PrivateRoute path="/playstation" component={PlatformPage} />
      <PrivateRoute path="/xbox" component={PlatformPage} />
      <PrivateRoute path="/pc" component={PlatformPage} />
      <PrivateRoute path="/list" component={MyListPage} />
      <PrivateRoute path="/upload" component={UploadImagePage} />
      <PrivateRoute path="/watch/:id" component={WatchPage} />
      <PrivateRoute path="/search" component={SearchPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
