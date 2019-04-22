import React from "react";
import { NavLink, Link, Route, Switch, withRouter } from "react-router-dom";
import { APIProvider, APIContext } from "./APIContext";
import Authentication from "./Authentication";
import Login from "./Login";
import SignUp from "./SignUp";
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

const MenuBar = withRouter(({ session, createSession, destroySession }) => {
  return (
    <div className="menu-bar-wrapper">
      <h1 className="menu-bar-header">
        <Link to="/">
          <span role="img" aria-label="Plate with knife and fork emoji">
            🍽
          </span>
        </Link>
      </h1>
      <div className="nav">
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/user-recipes", state: { title: "Your Recipes" } }}
        >
          {"Your Recipes"}
        </NavLink>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/add-recipe", state: { title: "Add Recipe" } }}
        >
          {"Add Recipe"}
        </NavLink>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/user-profile", state: { title: "Profile" } }}
        >
          {"Profile"}
        </NavLink>
      </div>
      <div className="user-menu">
        {session ? (
          <LogoutButton destroySession={destroySession} />
        ) : (
          <>
            <Login createSession={createSession} />
            <Link to="/sign-up">Sign Up?</Link>
          </>
        )}
      </div>
    </div>
  );
});

const AddRecipeContainer = withRouter(({ location, history }) => {
  const api = React.useContext(APIContext);
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "on-change":
          return {
            ...state,
            inputValues: {
              ...state.inputValues,
              [action.name]: action.value
            }
          };
        default:
          return state;
      }
    },
    {
      inputValues: {
        title: "",
        description: "",
        ingredients: "",
        instructions: ""
      }
    }
  );
  return (
    <div className="content-section">
      <h2>{location.state.title}</h2>
      <form
        className="grid-form-row"
        onSubmit={e => {
          e.preventDefault();
          return api
            .fetch("/recipes", {
              method: "POST",
              data: {
                ...state.inputValues
              }
            })
            .then(res => {
              history.push("/");
            });
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          name="title"
          value={state.inputValues.title}
          onChange={e => {
            console.log("input", e.target.name, e.target.value);
            dispatch({
              type: "on-change",
              name: e.target.name,
              value: e.target.value
            });
          }}
        />
        <label htmlFor="description">Description</label>
        <textarea
          required
          name="description"
          value={state.inputValues.description}
          onChange={e => {
            console.log("input", e.target.name, e.target.value);
            dispatch({
              type: "on-change",
              name: e.target.name,
              value: e.target.value
            });
          }}
        />
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          required
          placeholder="Please list each ingredient separated by a comma"
          name="ingredients"
          value={state.inputValues.ingredients}
          onChange={e => {
            console.log("input", e.target.name, e.target.value);
            dispatch({
              type: "on-change",
              name: e.target.name,
              value: e.target.value
            });
          }}
        />
        <label htmlFor="instructions">Instructions</label>
        <textarea
          required
          placeholder="Please list each step separated by a comma"
          name="instructions"
          value={state.inputValues.instructions}
          onChange={e => {
            console.log("input", e.target.name, e.target.value);
            dispatch({
              type: "on-change",
              name: e.target.name,
              value: e.target.value
            });
          }}
        />
        <button className="button-quarter" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
});

const ProtectedRoutes = withRouter(({ location, session }) =>
  session ? (
    <>
      <Route exact path="/add-recipe" render={() => <AddRecipeContainer />} />
      <Route
        exact
        path="/user-profile"
        render={() => (
          <section className="content-section">
            <h2>Profile</h2>
          </section>
        )}
      />
      <Route
        exact
        path="/user-recipes"
        render={() => (
          <section className="content-section">
            <h2>Your Recipes</h2>
          </section>
        )}
      />
    </>
  ) : (
    <section className="content-section">
      {location.state.title && <h2>{location.state.title}</h2>}
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
  return (
    <APIProvider>
      <Authentication>
        {({ session, createSession, destroySession, user }) => (
          <>
            <MenuBar
              session={session}
              createSession={createSession}
              destroySession={destroySession}
            />
            <div className="main-wrapper">
              <div className="main-container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <RecipesContainer user={user} />}
                  />
                  <Route exact path="/sign-up" component={SignUp} />
                  <ProtectedRoutes session={session} />
                </Switch>
              </div>
            </div>
          </>
        )}
      </Authentication>
    </APIProvider>
  );
};
