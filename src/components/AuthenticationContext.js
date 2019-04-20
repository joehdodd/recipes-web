import React from "react";

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

const AuthenticationProvider = ({ children }) => {
  const [session, setSession] = React.useState(
    !!document.cookie.includes("session")
  );
  const createSession = React.useCallback(() => {
    setSession(true);
  }, []);
  const destroySession = React.useCallback(() => {
    setSession(false);
    document.cookie = `session=; expires=${new Date()}`;
  }, []);
  // NOTE: why not use children({session, destroySession, createSession}) here?
  // do we need context?
  // maybe, since we would then need to drill destroySession down pretty far...
  return children({ session, createSession, destroySession });
};

export { AuthenticationProvider };
