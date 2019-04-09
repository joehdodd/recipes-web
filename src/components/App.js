import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../utils/Authentication";
import Login from "./Login";
import Main from "./Main";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return Authentication.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const App = () => (
  <React.Fragment>
    <Route path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Main} />
  </React.Fragment>
);

export default App;
