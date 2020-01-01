import React from "react";
import { APIContext } from "./APIContext";
import RecipeForm from "./RecipeForm";
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
  const handleSubmit = e => {
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
  };
  return (
    <div className="content-section">
      <RecipeForm handleSubmit={handleSubmit} />
    </div>
  );
});
