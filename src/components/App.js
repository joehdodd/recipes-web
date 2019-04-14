import React from "react";
import { APIProvider } from "./APIContext";
import Authentication from "./Authentication";
import Login from "./Login";
import Main from "./Main";
import "./App.css";

const LogoutButton = ({ destroySession }) => {
  return (
    <button
      style={{ width: 120, justifySelf: "end" }}
      onClick={() => destroySession()}
    >
      Log Out
    </button>
  );
};

const MenuBar = ({ session, createSession, destroySession }) => (
  <div className="menu-bar-wrapper">
    <h1 className="menu-bar-header">🍽</h1>
    {!!session ? (
      <LogoutButton destroySession={destroySession} />
    ) : (
      <Login createSession={createSession} />
    )}
  </div>
);

const App = () => (
  <React.Fragment>
    <APIProvider>
      <Authentication>
        {({ session, createSession, destroySession }) => (
          <React.Fragment>
            <MenuBar
              session={session}
              createSession={createSession}
              destroySession={destroySession}
            />
            <Main />
          </React.Fragment>
        )}
      </Authentication>
    </APIProvider>
  </React.Fragment>
);

export default App;
