import React from "react";
import { APIContext } from "./APIContext";

export default () => {
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
            },
            error: false
          };
        case "sign-up-error":
          return {
            ...state,
            error: true,
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
      }
    }
  );
  const handleSignUp = React.useCallback(e => {
    e.preventDefault();
    api
      .fetch("/users", {
        method: "POST",
        data: {
          ...state.inputValues
        }
      })
      .catch(err => {
        console.log("sign up error", err.response);
        dispatch({ type: "sign-up-error", message: err.response.data.message });
      });
  });
  return (
    <section className="content-section">
      <h2>Sign Up</h2>
      <form className="grid-form-row" onSubmit={handleSignUp}>
        <label for="username">Username</label>
        <input
          required
          type="text"
          name="username"
          value={state.inputValues.username}
          onChange={e =>
            dispatch({
              type: "on-change",
              name: e.target.name,
              value: e.target.value
            })
          }
        />
        <label for="password">Password</label>
        <input
          required
          type="password"
          name="password"
          value={state.inputValues.password}
          onChange={e =>
            dispatch({
              type: "on-change",
              name: e.target.name,
              value: e.target.value
            })
          }
        />
        <button className="button-half" type="submit">
          Submit
        </button>
      </form>
      <span>{state.error && state.message}</span>
    </section>
  );
};
