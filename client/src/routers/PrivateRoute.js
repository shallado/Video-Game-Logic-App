import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        props.match.path === '/account' ? (
          <Component {...props} />
        ) : (
          <div>
            <NavBar />
            <Component {...props} />
          </div>
        )
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.userId,
});

export default connect(mapStateToProps)(PrivateRoute);
