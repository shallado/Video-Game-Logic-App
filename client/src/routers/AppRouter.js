import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AccountPage from '../pages/AccountPage';
import AddReviewPage from '../pages/AddReviewPage';
import HomePage from '../pages/HomePage';
import MyListPage from '../pages/MyListPage';
import NotFoundPage from '../pages/NotFoundPage';
import PlatformPage from '../pages/PlatformPage';
import UpdateReviewPage from '../pages/UpdateReviewPage';
import UserReviewsPage from '../pages/UserReviewsPage';
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
      <PrivateRoute path="/user-reviews" component={UserReviewsPage} />
      <PrivateRoute path="/review" component={AddReviewPage} exact={true} />
      <PrivateRoute path="/review/:id" component={UpdateReviewPage} />
      {['/dashboard', '/nintendo', '/playstation', '/xbox', '/pc'].map(
        (path, index) => (
          <PrivateRoute path={path} component={PlatformPage} key={index} />
        )
      )}
      <PrivateRoute path="/list" component={MyListPage} />
      <PrivateRoute path="/upload" component={UploadImagePage} />
      <PrivateRoute path="/watch/:id" component={WatchPage} />
      <PrivateRoute path="/search" component={SearchPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
