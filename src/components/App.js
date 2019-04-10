import React from "react";
import { Route, Redirect } from "react-router-dom";
import { APIProvider } from "./APIContext";
import { AuthContext, AuthenticationProvider } from "./AuthenticationContext";
// import Authentication from "../utils/Authentication";
import Login from "./Login";
import Main from "./Main";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated() ? (
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
      <AuthenticationProvider>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Main} />
      </AuthenticationProvider>
    </APIProvider>
  </React.Fragment>
);

export default App;
