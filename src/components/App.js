import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { APIProvider } from "./APIContext";
import { AuthContext, AuthenticationProvider } from "./AuthenticationContext";
import Login from "./Login";
import Main from "./Main";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = React.useContext(AuthContext);
  console.log("auth context", authContext);

  return (
    <Route
      {...rest}
      render={props => {
        return !!authContext.session ? (
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
    <APIProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <AuthenticationProvider>
          <PrivateRoute exact path="/" component={Main} />
        </AuthenticationProvider>
      </Switch>
    </APIProvider>
  </React.Fragment>
);

export default App;
