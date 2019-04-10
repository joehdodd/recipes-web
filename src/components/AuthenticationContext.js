import React from "react";
import { withRouter } from "react-router-dom";
import { APIContext } from "./APIContext";

// NOTE: custom hook below for setting value to state from local storage
// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ""
//   );

//   React.useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };

// const App = () => {
//   const [value, setValue] = useStateWithLocalStorage("myValueInLocalStorage");
//   return (
//     <div>
//       <p>Neat</p>
//     </div>
//   );
// };

const AuthContext = React.createContext();

const AuthenticationProvider = withRouter(({ history, children }) => {
  const { error } = React.useContext(APIContext);
  const destroy = React.useCallback(() => {
    localStorage.removeItem("auth");
    history.push("/");
  });
  const isAuthenticated = () => {
    return !!localStorage.getItem("auth");
  };
  const setAuthenticated = token => {
    return localStorage.setItem("auth", token);
  };
  React.useEffect(() => {
    console.log("api context in auth context", error);
    if (error) {
      console.log("error");
      history.push("/");
      localStorage.removeItem("auth");
    }
  }, [error]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, destroy, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export { AuthContext, AuthenticationProvider };
