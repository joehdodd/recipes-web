import React from "react";
import { APIContext } from "../APIContext";

export default props => {
  const apiContext = React.useContext(APIContext);
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(() => {
    apiContext
      .fetch("/recipes", {
        method: "GET",
        params: { user: true }
      })
      .then(res => setRecipes(res.data.data));
  }, []);
  return (
    <div>
      <h2>Your Recipes</h2>
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
