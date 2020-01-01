import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(
  ({ handleSubmit, inputValues }) => {
    React.useEffect(() => {
      Object.entries(inputValues).forEach(entry => {
        return dispatch({
          type: "on-change",
          name: entry[0],
          value: entry[1]
        });
      });
    }, [inputValues]);
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
        <form
          className="grid-form-row"
          onSubmit={e => {
            e.preventDefault();
            return handleSubmit(state.inputValues);
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
  }
);
