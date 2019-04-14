import React from "react";
import { APIContext } from "./APIContext";

export default ({ user }) => {
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
          {!!user.favoriteRecipes &&
            !!user.favoriteRecipes.length &&
            user.favoriteRecipes.find(id => id === recipe.id) && (
              <span role="img" aria-label="Favorite star">
                ⭐️
              </span>
            )}
        </div>
      ))}
    </React.Fragment>
  );
};
