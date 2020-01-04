import React from "react";

// NOTE: custom hook below for setting value to state from local storage
const useStateWithLocalStorage = localStorageKey => {

  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey))
      : {}
  );

  React.useEffect(() => {
    console.log('value change', value)
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default ({ children }) => {
  const [session, setSession] = React.useState(
    !!document.cookie.includes("JWTAuth")
  );
  const [user, setUser] = useStateWithLocalStorage("user");
  const createSession = React.useCallback(user => {
    setSession(true);
    setUser(user);
  }, []);
  const destroySession = React.useCallback(() => {
    const cookieDomain =
      process.env.REACT_APP_ENV === "production"
        ? ".recipes.casa"
        : "localhost";
    document.cookie = `JWTAuth=;expires=${new Date()}domain=${cookieDomain}`;
    setSession(false);
    setUser("");
  }, []);
  // NOTE: why not use children({session, destroySession, createSession}) here?
  // do we need context?
  // maybe, since we would then need to drill destroySession down pretty far...
  return children({ session, createSession, destroySession, user, setUser });
};
