import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { APIContext } from "./APIContext";
import Authentication from "./Authentication";
import MenuBar from "./MenuBar";
import AddRecipeContainer from "./AddRecipeContainer";
import SignUp from "./SignUp";
import Login from "./Login";
import RecipesContainer from "./Recipes/RecipesContainer";
import RecipeContainer from "./Recipes/RecipeContainer";
import Profile from "./Profile";

const ProtectedRoutes = withRouter(
  ({
    location,
    session,
    destroySession,
    user,
    searchTerm,
    onChange,
    setUser
  }) =>
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
              selectedRecipe={{}}
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
  const apiContext = React.useContext(APIContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  const onChange = e => {
    setSearchTerm(e.target.value);
    console.log("value", e.target.value);
    const endpoint = `/recipes/${e.target.value}`;
    apiContext
      .fetch(endpoint, {
        method: "GET"
      })
      .then(res => {
        console.log(res.data.data);
      })
      .catch(err => err);
  };
  return (
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
                      <div
                        className="content-section align-start"
                        style={{
                          display: "grid",
                          gridAutoFlow: "column",
                          gridGap: "8px",
                          justifyContent: "start",
                          alignItems: "center"
                        }}
                      >
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={e => onChange(e)}
                        />
                        <span role="img" aria-label="search recipes">
                          &#128269;
                        </span>
                      </div>
                      <RecipesContainer
                        user={user}
                        searchTerm={searchTerm}
                        selectedRecipe={{}}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/recipe/:recipeId"
                  render={({ match }) => (
                    <RecipeContainer
                      user={user}
                      recipeId={match.params.recipeId}
                    />
                  )}
                />
                <Route exact path="/sign-up" component={SignUp} />
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <div className="content-section">
                      <Login createSession={createSession} />
                    </div>
                  )}
                />
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
  );
};
