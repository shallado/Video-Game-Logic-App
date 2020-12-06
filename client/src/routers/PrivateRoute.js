import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import MoreInfoModal from '../modals/MoreInfoModal';
import PlayOptionsModal from '../modals/PlayOptionsModal';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  const pathsPrimary = [
    '/account',
    '/upload',
    '/watch/:id',
    '/review',
    '/review/:id',
    '/user-reviews',
  ];
  const pathsSecondary = ['/search', '/list', '/category'];

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          if (pathsPrimary.includes(props.match.path)) {
            return <Component {...props} />;
          } else {
            if (pathsSecondary.includes(props.match.path)) {
              return (
                <>
                  <NavBar />
                  <Component {...props} />
                  <MoreInfoModal {...props} />
                  <PlayOptionsModal />
                </>
              );
            } else {
              return (
                <>
                  <NavBar />
                  <Header />
                  <Component {...props} />
                  <MoreInfoModal {...props} />
                  <PlayOptionsModal />
                </>
              );
            }
          }
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
