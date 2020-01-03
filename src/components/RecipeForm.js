import React from "react";
import { withRouter } from "react-router-dom";

const IterativeInput = ({
  type,
  count,
  name,
  label,
  values,
  onChange,
  onMinus,
  onPlus
}) => {
  return (
    <div className="form-itr-input-wrapper">
      <div className="form-itr-input">
        {Array(count)
          .fill(null)
          .map((_, i) => (
            <div className="form-ing-inst-grid" key={`${name}_${i + 1}`}>
              <span>{i + 1}.</span>
              {React.createElement(type, {
                required: true,
                type: "text",
                placeholder: `${label} ${i + 1}`,
                value: values[`${name}_${i + 1}`],
                onChange,
                name: `${name}_${i + 1}`
              })}
            </div>
          ))}
      </div>
      <div className="form-itr-button-wrapper">
        {count > 1 && (
          <button className="form-minus-button" onClick={onMinus}>
            -
          </button>
        )}
        <button
          className={`form-plus-button ${count === 1 &&
            "form-plus-button-borders"}`}
          onClick={onPlus}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default withRouter(({ handleSubmit, inputValues }) => {
  React.useEffect(() => {
    if (inputValues) {
      dispatch({
        type: "set-itr-count",
        name: "ingredientCount",
        count: inputValues.ingredients.length
      });
      dispatch({
        type: "set-itr-count",
        name: "instructionCount",
        count: inputValues.instructions.length
      });
      Object.entries(inputValues).forEach(([key, value]) => {
        return key === "ingredients" || key === "instructions"
          ? value.map(obj =>
              dispatch({
                type: "on-change",
                inputType: key,
                name: Object.keys(obj)[0],
                value: Object.values(obj)[0]
              })
            )
          : dispatch({
              type: "on-change",
              name: key,
              value: value
            });
      });
    }
  }, [inputValues]);
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "on-change":
          if (action.inputType) {
            return {
              ...state,
              inputValues: {
                ...state.inputValues,
                [action.inputType]: {
                  ...state.inputValues[action.inputType],
                  [action.name]: action.value
                }
              }
            };
          } else {
            return {
              ...state,
              inputValues: {
                ...state.inputValues,
                [action.name]: action.value
              }
            };
          }
        case "set-itr-count":
          return {
            ...state,
            [action.name]: action.count
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
        case "increment-inst-count":
          return {
            ...state,
            instructionCount: state.instructionCount + 1
          };
        case "decrement-inst-count":
          return {
            ...state,
            instructionCount:
              state.instructionCount > 1
                ? state.instructionCount - 1
                : state.instructionCount
          };
        default:
          return state;
      }
    },
    {
      ingredientCount: 1,
      instructionCount: 1,
      ingredientsArray: [],
      instructionsArray: [],
      inputValues: {
        title: "",
        description: "",
        ingredients: {
          ingredient_1: ""
        },
        instructions: {
          instruction_1: ""
        }
      }
    }
  );
  return (
    <form
      className="grid-form-row"
      onSubmit={e => {
        e.stopPropagation();
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
          dispatch({
            type: "on-change",
            name: e.target.name,
            value: e.target.value
          });
        }}
      />
      <label htmlFor="ingredients">Ingredients</label>
      <IterativeInput
        type="input"
        count={state.ingredientCount}
        name="ingredient"
        label="Ingredients"
        values={state.inputValues.ingredients}
        onChange={e => {
          dispatch({
            type: "on-change",
            inputType: "ingredients",
            name: e.target.name,
            value: e.target.value
          });
        }}
        onMinus={e => {
          e.stopPropagation();
          e.preventDefault();
          dispatch({ type: "decrement-ing-count" });
        }}
        onPlus={e => {
          e.stopPropagation();
          e.preventDefault();
          dispatch({ type: "increment-ing-count" });
        }}
      />
      <label htmlFor="instructions">Instructions</label>
      <IterativeInput
        type="textarea"
        count={state.instructionCount}
        name="instruction"
        label="Instructions"
        values={state.inputValues.instructions}
        onChange={e => {
          dispatch({
            type: "on-change",
            inputType: "instructions",
            name: e.target.name,
            value: e.target.value
          });
        }}
        onMinus={e => {
          e.stopPropagation();
          e.preventDefault();
          dispatch({ type: "decrement-inst-count" });
        }}
        onPlus={e => {
          e.stopPropagation();
          e.preventDefault();
          dispatch({ type: "increment-inst-count" });
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
  );
});
