import React from "react";
import { APIContext } from "./APIContext";
// import { AuthContext } from "./AuthenticationContext";
import "./App.css";

export default ({ createSession }) => {
  const apiContext = React.useContext(APIContext);
  // const { createSession } = React.useContext(AuthContext);
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
        case "set-error":
          return {
            ...state,
            error: action.error,
            message: action.message
          };
        default:
          return state;
      }
    },
    {
      inputValues: {
        username: "",
        password: ""
      },
      redirect: false,
      count: 0,
      error: false,
      message: ""
    }
  );
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
        console.log("login success", res);
        return createSession(res.data.user);
      })
      .catch(err => {
        console.log("session err", err.response);
        dispatch({
          type: "set-error",
          error: true,
          message: "There was an issue... 😞"
        });
      });
  };
  return (
    <form className="login" onSubmit={onSubmit}>
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
  );
};
