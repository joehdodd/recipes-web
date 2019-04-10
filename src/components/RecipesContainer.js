import React from "react";
import { APIContext } from "./APIContext";

export default () => {
  const apiContext = React.useContext(APIContext);
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(() => {
    apiContext
      .fetch("/recipes", {
        method: "GET",
        params: { user: true }
      })
      .then(res => setRecipes(res.data.data))
      .catch(err => err);
  }, []);
  return (
    <div>
      <h2>Your Stuff</h2>
      <div className="recipe-rows-container">
        {recipes.map(recipe => (
          <div className="recipe-row" key={recipe.id}>
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
