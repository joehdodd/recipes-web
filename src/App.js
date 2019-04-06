import React from "react";
import { Route, Redirect } from "react-router-dom";
import { APIContext } from "./APIContext";
import Login from "./Login";
import Main from "./Main";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const apiContext = React.useContext(APIContext);
  return (
    <Route
      {...rest}
      render={props => {
        return apiContext.isAuthenticated ? (
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
  <div>
    <Route path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Main} />
  </div>
);

export default App;
