import React from "react";
import { withRouter } from "react-router-dom";
import { APIContext } from "./APIContext";

const AuthContext = React.createContext();

const AuthenticationProvider = withRouter(({ location, history, children }) => {
  const apiContext = React.useContext(APIContext);
  const destroyAuth = React.useCallback(() => {
    return localStorage.removeItem("auth");
  });
  const isAuthenticated = () => {
    return !!localStorage.getItem("auth");
  };
  const setAuthenticated = token => {
    return localStorage.setItem("auth", token);
  };
  React.useEffect(() => {
    if (apiContext.error) {
      history.push("/");
      localStorage.removeItem("auth");
    }
  }, [apiContext.error]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, destroyAuth, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export { AuthContext, AuthenticationProvider };
