import React from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
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

const MenuBar = withRouter(
  ({ location, session, createSession, destroySession }) => {
    const { pathname } = location;
    return (
      <div className="menu-bar-wrapper">
        <h1 className="menu-bar-header">
          <span role="img" aria-label="Plate with knife and fork emoji">
            🍽
          </span>
        </h1>
        <div className="nav">
          <Link to={pathname === "/" ? "/add-recipe" : "/"}>
            {pathname === "/" ? "Add Recipe" : "Home"}
          </Link>
        </div>
        <div className="user-menu">
          {!!session ? (
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
  }
);

const AddRecipeContainer = withRouter(({ history }) => {
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
      <h2>Add a New Recipe</h2>
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
        <label for="title">Title</label>
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
        <label for="description">Description</label>
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
        <label for="ingredients">Ingredients</label>
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
        <label for="instructions">Instructions</label>
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
              adding={adding}
              handleAdding={() => setAdding(!adding)}
            />
            <div className="main-wrapper">
              <div className="main-container">
                <Switch>
                  <Route
                    path="/add-recipe"
                    render={() =>
                      session ? (
                        <AddRecipeContainer />
                      ) : (
                        <section className="content-section">
                          <h2>
                            Hey! You gotta log in first.{" "}
                            <span role="img" aria-label="Winking face emoji">
                              😉
                            </span>
                          </h2>
                        </section>
                      )
                    }
                  />
                  <Route
                    exact
                    path="/"
                    render={() => <RecipesContainer user={user} />}
                  />
                  <Route path="/sign-up" component={SignUp} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        )}
      </Authentication>
    </APIProvider>
  );
};
