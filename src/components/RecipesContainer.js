import React from "react";
import { withRouter } from "react-router-dom";
import { APIContext } from "./APIContext";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";

const RecipeRow = ({ recipe, handleSelect }) => {
  return (
    <div className="recipe-row" onClick={handleSelect}>
      <h3>{recipe.title}</h3>
    </div>
  );
};

const Recipes = ({ text, recipes, setSelectedRecipe }) => {
  return recipes && recipes.length ? (
    recipes.map(recipe => (
      <RecipeRow
        key={recipe.id}
        recipe={recipe}
        handleSelect={() =>
          setSelectedRecipe(recipes.find(r => r.id === recipe.id))
        }
      />
    ))
  ) : (
    <div className="recipe-row">
      <h3>
        Whoops! {text}{" "}
        <span role="img" aria-label="crying emoji">
          😩
        </span>
      </h3>
    </div>
  );
};

export default withRouter(({ user, location }) => {
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
      .then(res => {
        setRecipes(res.data.data);
      })
      .catch(err => err);
  }, [user]);
  React.useEffect(() => {
    if (location.state !== undefined) {
      setSelectedRecipe(location.state);
    }
  }, [location.state]);
  const handleUpdateRecipe = inputValues => {
    const instructionsArray = Object.entries(
      inputValues.instructions
    ).map(([key, value]) => ({ [key]: value }));
    const ingredientsArray = Object.entries(
      inputValues.ingredients
    ).map(([key, value]) => ({ [key]: value }));
    apiContext
      .fetch(`/recipes/${selectedRecipe.id}`, {
        method: "PUT",
        data: {
          title: inputValues.title,
          description: inputValues.description,
          instructionsArray,
          ingredientsArray
        }
      })
      .then(res => {
        setSelectedRecipe({ ...res.data.data });
        setEditingRecipe(false);
      })
      .catch(err => err);
  };
  const handleRenderRecipe = () => {
    return editingRecipe ? (
      <>
        <RecipeForm
          inputValues={selectedRecipe}
          handleSubmit={inputValues => handleUpdateRecipe(inputValues)}
        />
        <button
          style={{ margin: "4px" }}
          onClick={() => setEditingRecipe(false)}
        >
          Cancel
        </button>
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
      {!!Object.keys(selectedRecipe).length ? (
        handleRenderRecipe()
      ) : (
        <Recipes
          text={user ? "You don't have any recipes!" : "There are no recipes!"}
          recipes={recipes}
          setSelectedRecipe={setSelectedRecipe}
        />
      )}
    </React.Fragment>
  );
});
