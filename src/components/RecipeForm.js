import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(({ handleSubmit, inputValues = {} }) => {
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
        case "increment-ing-count":
          return {
            ...state,
            ingredientCount: state.ingredientCount + 1
          };
        case "decrement-ing-count":
          return {
            ...state,
            ingredientCount:
              state.ingredientCount > 1
                ? state.ingredientCount - 1
                : state.ingredientCount
          };
        default:
          return state;
      }
    },
    {
      ingredientCount: 1,
      instructionCount: 1,
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
      <form className="grid-form-row">
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
        {Array(state.ingredientCount)
          .fill(null)
          .map((_, i) => (
            <div className="form-ing-inst-grid">
              <span>{i + 1}.</span>
              <textarea
                required
                placeholder="Please list one ingredient per field"
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
            </div>
          ))}
        <div>
          <button
            className="form-minus-button"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              dispatch({ type: "decrement-ing-count" });
            }}
          >
            -
          </button>
          <button
            className="form-plus-button"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              dispatch({ type: "increment-ing-count" });
            }}
          >
            +
          </button>
        </div>
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
        <button
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            return handleSubmit(state.inputValues);
          }}
          className="button-quarter"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
});
