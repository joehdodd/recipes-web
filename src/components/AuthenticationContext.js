import React from "react";
import { withRouter } from "react-router-dom";

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
  const [session, setSession] = React.useState(
    !!document.cookie.includes("session")
  );
  const destroy = React.useCallback(() => {
    setSession(false);
    document.cookie = `session=; expires=${new Date()}`;
    history.push("/login");
  }, []);
  React.useEffect(() => {
    if (!session) {
      history.push("/login");
    }
  }, [session]);
  return (
    <AuthContext.Provider value={{ session, destroy }}>
      {children}
    </AuthContext.Provider>
  );
});

export { AuthContext, AuthenticationProvider };
