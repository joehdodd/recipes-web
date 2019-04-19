import React from "react";
import { Link, Route } from "react-router-dom";
import { APIProvider } from "./APIContext";
import Authentication from "./Authentication";
import Login from "./Login";
import RecipesContainer from "./RecipesContainer";
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

const MenuBar = ({ session, createSession, destroySession, handleAdding }) => (
  <div className="menu-bar-wrapper">
    <h1 className="menu-bar-header">🍽</h1>
    {!!session ? (
      <div>
        <button onClick={handleAdding}>Add a Recipe</button>
        <LogoutButton destroySession={destroySession} />
      </div>
    ) : (
      <Login createSession={createSession} />
    )}
  </div>
);

export default () => {
  const [adding, setAdding] = React.useState(false);
  return (
    <APIProvider>
      <Authentication>
        {({ session, createSession, destroySession, user }) => (
          <React.Fragment>
            <MenuBar
              session={session}
              createSession={createSession}
              destroySession={destroySession}
              handleAdding={() => setAdding(true)}
            />
            <div className="main-wrapper">
              <div className="main-container">
                {session && adding ? (
                  <div>
                    <h2>YEET!</h2>
                    <button onClick={() => setAdding(false)}>
                      Please stop
                    </button>
                  </div>
                ) : (
                  <RecipesContainer user={user} />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </Authentication>
    </APIProvider>
  );
};
