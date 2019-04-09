import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Authentication from "../utils/Authentication";
import Login from "./Login";
import Main from "./Main";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return Authentication.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        );
      }}
    />
  );
};

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute component={Main} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
