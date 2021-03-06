import React from "react";
import { withRouter } from "react-router-dom";
import FilterResults from "react-filter-search";
import { APIContext } from "./APIContext";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";

const RecipeRow = ({ user, recipe, handleSelect }) => {
  return (
    <div className="recipe-row" onClick={handleSelect}>
      <h3>{recipe.title}</h3>
      {user &&
        user.favoriteRecipes &&
        user.favoriteRecipes.includes(recipe.id) && (
          <span
            role="img"
            aria-label="favorite recipe"
            style={{ fontSize: "32px", justifySelf: "end" }}
          >
            ⭐️
          </span>
        )}
    </div>
  );
};

const Recipes = ({ text, recipes, setSelectedRecipe, searchTerm, user }) => {
  return recipes && recipes.length ? (
    <FilterResults
      data={recipes}
      value={searchTerm}
      renderResults={results =>
        results.map(recipe => (
          <RecipeRow
            user={user}
            key={recipe.id}
            recipe={recipe}
            handleSelect={() =>
              setSelectedRecipe(recipes.find(r => r.id === recipe.id))
            }
          />
        ))
      }
    />
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

export default withRouter(({ user, location, searchTerm, setUser }) => {
  const apiContext = React.useContext(APIContext);
  const [recipes, setRecipes] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState({});
  const [editingRecipe, setEditingRecipe] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);
  React.useEffect(() => {
    const endpoint =
      !!user && location.pathname === "/user-recipes"
        ? `/users/${user.id}/recipes`
        : "/recipes";
    setFetching(true);
    apiContext
      .fetch(endpoint, {
        method: "GET"
      })
      .then(res => {
        setFetching(false);
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
    const instructionsArray = Object.entries(inputValues.instructions).map(
      ([key, value]) => value
    );
    const ingredientsArray = Object.entries(inputValues.ingredients).map(
      ([key, value]) => value
    );
    console.log("***instArr", instructionsArray);
    console.log("***ingArr", ingredientsArray);
    // apiContext
    //   .fetch(`/recipes/${selectedRecipe.id}`, {
    //     method: "PUT",
    //     data: {
    //       title: inputValues.title,
    //       description: inputValues.description,
    //       instructionsArray,
    //       ingredientsArray
    //     }
    //   })
    //   .then(res => {
    //     setSelectedRecipe({ ...res.data.data });
    //     setEditingRecipe(false);
    //   })
    //   .catch(err => err);
  };
  const handleFavoriteRecipe = () => {
    let recipeId = selectedRecipe.id;
    let userId = user.id;
    apiContext
      .fetch(`/users`, {
        method: "PUT",
        data: {
          userId,
          recipeId
        }
      })
      .then(res => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch(err => err);
  };
  const handleRenderRecipe = () => {
    return editingRecipe ? (
      <div className="content-section">
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
      </div>
    ) : (
      <Recipe
        userRecipe={
          user &&
          user.id &&
          user.id.toString() === selectedRecipe.userId.toString()
            ? true
            : false
        }
        user={user}
        handleEditRecipe={() => setEditingRecipe(true)}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
        handleFavoriteRecipe={handleFavoriteRecipe}
      />
    );
  };
  return (
    <>
      {!fetching && (
        <>
          {!!Object.keys(selectedRecipe).length ? (
            handleRenderRecipe()
          ) : (
            <Recipes
              text={
                user ? "You don't have any recipes!" : "There are no recipes!"
              }
              user={user}
              recipes={recipes}
              setSelectedRecipe={setSelectedRecipe}
              searchTerm={searchTerm}
            />
          )}
        </>
      )}
      {fetching && (
        <div className="recipe-row">
          <h3>
            Loading yummy...{" "}
            <span role="img" aria-label="Yummy emoji">
              😋
            </span>
          </h3>
        </div>
      )}
    </>
  );
});
