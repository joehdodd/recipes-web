import React from "react";
import { Redirect } from "react-router-dom";
import { APIContext } from "./APIContext";
import Authentication from "./utils/Authentication";

function loginReducer(state, action) {
  switch (action.type) {
    case "on-change":
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.name]: action.value
        }
      };
    case "set-redirect":
      return {
        ...state,
        redirect: action.redirect
      };
    case "set-error":
      return {
        ...state,
        error: action.error,
        message: action.message
      };
    default:
      return state;
  }
}

export default props => {
  let { from } = props.location.state || { from: { pathname: "/" } };
  const apiContext = React.useContext(APIContext);
  const [state, dispatch] = React.useReducer(loginReducer, {
    inputValues: {
      username: "",
      password: ""
    },
    redirect: false,
    error: false,
    message: ""
  });
  const onSubmit = e => {
    e.preventDefault();
    apiContext
      .fetch("/session", {
        method: "POST",
        data: {
          username: state.inputValues.username,
          password: state.inputValues.password
        }
      })
      .then(res => {
        Authentication.setAuthenticated(res.data.isAuthenticated);
        dispatch({ type: "set-redirect", redirect: true });
      })
      .catch(err => {
        console.log("session err", err);
        dispatch({
          type: "set-error",
          error: true,
          message: "There was an issue... 😞"
        });
      });
  };
  return state.redirect ? (
    <Redirect to={from} />
  ) : (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome to Recipes!</h2>
        <form className="login-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={state.inputValues.username}
            name="username"
            onChange={e =>
              dispatch({
                type: "on-change",
                name: e.target.name,
                value: e.target.value
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            name="password"
            onChange={e =>
              dispatch({
                type: "on-change",
                name: e.target.name,
                value: e.target.value
              })
            }
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
