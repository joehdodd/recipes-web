import React from "react";
import { APIContext } from "./APIContext";
import RecipeForm from "./RecipeForm";
import { withRouter } from "react-router-dom";

export default withRouter(({ location, history }) => {
  const api = React.useContext(APIContext);
  const handleSubmit = inputValues => {
    const instructionsArray = Object.entries(
      inputValues.instructions
    ).map(([key, value]) => ({ [key]: value }));
    const ingredientsArray = Object.entries(
      inputValues.ingredients
    ).map(([key, value]) => ({ [key]: value }));
    return api
      .fetch("/recipes", {
        method: "POST",
        data: {
          title: inputValues.title,
          description: inputValues.description,
          instructionsArray,
          ingredientsArray
        }
      })
      .then(res => {
        history.push({ pathname: "/", state: { ...res.data.data } });
      });
  };
  return (
    <div className="content-section">
      <RecipeForm handleSubmit={handleSubmit} />
    </div>
  );
});
