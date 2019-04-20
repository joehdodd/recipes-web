import React from "react";
import { APIContext } from "./APIContext";

const RecipeRow = ({ recipe, handleSelect }) => (
  <div className="recipe-row" onClick={handleSelect}>
    <h3>{recipe.title}</h3>
  </div>
);

export default ({ user }) => {
  const apiContext = React.useContext(APIContext);
  const [recipes, setRecipes] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState({});
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
      {!!Object.keys(selectedRecipe).length ? (
        <div className="content-section">
          <h1>{selectedRecipe.title}</h1>
          <p>{selectedRecipe.description}</p>
          <button onClick={() => setSelectedRecipe({})}>All</button>
        </div>
      ) : (
        recipes.map(recipe => (
          <RecipeRow
            key={recipe.id}
            recipe={recipe}
            handleSelect={() =>
              setSelectedRecipe(recipes.find(r => r.id === recipe.id))
            }
          />
        ))
      )}
    </React.Fragment>
  );
};
