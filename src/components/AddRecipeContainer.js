import React from "react";
import { APIContext } from "./APIContext";
import { withRouter } from "react-router-dom";

export default withRouter(({ location, history }) => {
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