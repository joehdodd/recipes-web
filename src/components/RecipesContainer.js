import React from "react";
import { APIContext } from "./APIContext";

export default () => {
  const apiContext = React.useContext(APIContext);
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(() => {
    apiContext
      .fetch("/recipes", {
        method: "GET"
      })
      .then(res => setRecipes(res.data.data))
      .catch(err => err);
  }, []);
  return (
    <React.Fragment>
      {recipes.map(recipe => (
        <div className="recipe-row" key={recipe.id}>
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </React.Fragment>
  );
};
