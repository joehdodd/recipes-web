import React from "react";
import { APIContext } from "./APIContext";

const RecipeRow = ({ recipe, handleSelect }) => {
  console.log("recipe", recipe);
  return (
    <div className="recipe-row" onClick={handleSelect}>
      <h3>{recipe.title}</h3>
    </div>
  );
};

export default ({ user }) => {
  const apiContext = React.useContext(APIContext);
  const [recipes, setRecipes] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState({});
  React.useEffect(() => {
    const endpoint = !!user ? `/users/${user}/recipes` : "/recipes";
    apiContext
      .fetch(endpoint, {
        method: "GET"
      })
      .then(res => setRecipes(res.data.data))
      .catch(err => err);
  }, [user]);
  return (
    <React.Fragment>
      {!!Object.keys(selectedRecipe).length ? (
        <div className="content-section">
          <h1>{selectedRecipe.title}</h1>
          <p>{selectedRecipe.description}</p>
          <h2>Ingredients</h2>
          <ul>
            {!!selectedRecipe.ingredients &&
              selectedRecipe.ingredients.map(ing => (
                <li className="recipe-ingredient-item">
                  <span>{ing}</span>
                </li>
              ))}
          </ul>
          <h2>Instructions</h2>
          <ol>
            {!!selectedRecipe.instructions &&
              selectedRecipe.instructions.map((inst, i) => (
                <li className="recipe-instruction-item">
                  <span>{inst}</span>
                </li>
              ))}
          </ol>
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
