import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import MoreInfoModal from '../modals/MoreInfoModal';
import PlayOptionsModal from '../modals/PlayOptionsModal';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) => {
      return isAuthenticated ? (
        props.match.path === '/account' ||
        props.match.path === '/upload' ||
        props.match.path === '/watch/:id' ||
        props.match.path === '/review' ||
        props.match.path === '/review/:id' ||
        props.match.path === '/user-reviews' ? (
          <Component {...props} />
        ) : props.match.path === '/search' || props.match.path === '/list' ? (
          <div>
            <NavBar />
            <Component {...props} />
            <MoreInfoModal />
            <PlayOptionsModal />
          </div>
        ) : (
          <div>
            <NavBar />
            <Header />
            <Component {...props} />
            <MoreInfoModal />
            <PlayOptionsModal />
          </div>
        )
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
