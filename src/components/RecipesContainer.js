import React from "react";
import { APIContext } from "./APIContext";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";

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
  const [editingRecipe, setEditingRecipe] = React.useState(false);
  React.useEffect(() => {
    const endpoint = !!user ? `/users/${user}/recipes` : "/recipes";
    apiContext
      .fetch(endpoint, {
        method: "GET"
      })
      .then(res => setRecipes(res.data.data))
      .catch(err => err);
  }, [user]);
  const handleUpdateRecipe = inputValues => {
    apiContext
      .fetch(`/recipes/${selectedRecipe.id}`, {
        method: "PUT",
        data: {...inputValues}
      })
      .then(res => {
        setSelectedRecipe({...res.data.data});
        setEditingRecipe(false);
      })
      .catch(err => err);
  };
  const handleRenderRecipe = () => {
    return editingRecipe ? (
      <>
        <RecipeForm inputValues={selectedRecipe} handleSubmit={inputValues => handleUpdateRecipe(inputValues)}/>
        <button style={{ margin: "4px" }} onClick={() => setEditingRecipe(false)}>Cancel</button>
      </>
    ) : (
      <Recipe
        handleEditRecipe={() => setEditingRecipe(true)}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
      />
    );
  };
  return (
    <React.Fragment>
      {!!Object.keys(selectedRecipe).length
        ? handleRenderRecipe()
        : recipes.map(recipe => (
            <RecipeRow
              key={recipe.id}
              recipe={recipe}
              handleSelect={() =>
                setSelectedRecipe(recipes.find(r => r.id === recipe.id))
              }
            />
          ))}
    </React.Fragment>
  );
};
