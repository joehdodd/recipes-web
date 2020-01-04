import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { APIProvider } from "./APIContext";
import Authentication from "./Authentication";
import MenuBar from "./MenuBar";
import AddRecipeContainer from "./AddRecipeContainer";
import SignUp from "./SignUp";
import RecipesContainer from "./RecipesContainer";
import Profile from "./Profile";
import "./App.css";

const ProtectedRoutes = withRouter(
  ({ location, session, destroySession, user, searchTerm, onChange, setUser }) =>
    session ? (
      <>
        <Route exact path="/add-recipe" render={() => <AddRecipeContainer />} />
        <Route
          exact
          path="/user-profile"
          render={() => (
            <Profile destroySession={destroySession} currentUser={user} />
          )}
        />
        <Route
          exact
          path="/user-recipes"
          render={() => (
            <RecipesContainer
              user={user}
              setUser={setUser}
              searchTerm={searchTerm}
              onChange={onChange}
            />
          )}
        />
      </>
    ) : (
      <section className="content-section">
        <h3>
          Hey! You gotta log in first.{" "}
          <span role="img" aria-label="Winking face emoji">
            😉
          </span>
        </h3>
      </section>
    )
);

export default () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const onChange = e => {
    setSearchTerm(e.target.value);
  };
  return (
    <APIProvider>
      <Authentication>
        {({ session, createSession, destroySession, user, setUser }) => (
          <>
            <MenuBar session={session} createSession={createSession} />
            <main className="main-wrapper">
              <div className="main-container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <div className="main-content">
                        <div className="content-section align-start">
                          <h3>Search Recipes</h3>
                          <input value={searchTerm} onChange={onChange} />
                        </div>
                        <RecipesContainer user={user} searchTerm={searchTerm} />
                      </div>
                    )}
                  />
                  <Route exact path="/sign-up" component={SignUp} />
                  <ProtectedRoutes
                    destroySession={destroySession}
                    session={session}
                    user={user}
                    setUser={setUser}
                    searchTerm={searchTerm}
                    onChange={onChange}
                  />
                </Switch>
              </div>
            </main>
          </>
        )}
      </Authentication>
    </APIProvider>
  );
};
