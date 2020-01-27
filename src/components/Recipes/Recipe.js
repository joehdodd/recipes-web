import React from "react";
import CommentsContainer from "../CommentsContainer";

export default ({
  user,
  userRecipe,
  selectedRecipe,
  handleEditRecipe,
  setSelectedRecipe,
  handleFavoriteRecipe,
  recipe
}) => {
  console.log(recipe.comments)
  return (
    <>
      <div className="content-section">
        <div className="content-section-top">
          <h1>{recipe.title}</h1>
          <div className="content-section-top-buttons">
            {/* {userRecipe && (
                <button onClick={() => handleEditRecipe()}>Edit</button>
              )} */}
            {/* {user &&
              user.favoriteRecipes &&
              !user.favoriteRecipes.includes(recipe.id) && (
                <button onClick={() => handleFavoriteRecipe()}>Favorite</button>
              )} */}
          </div>
        </div>
        <hr />
        <p>{recipe.description}</p>
        <h3>Ingredients</h3>
        <ul>
          {!!recipe.ingredients &&
            recipe.ingredients
              .sort((a, b) => a.order - b.order)
              .map((ing, i) => (
                <li key={`ingredient_${i}`} className="recipe-ingredient-item">
                  <span>{ing.ingredient}</span>
                </li>
              ))}
        </ul>
        <h3>Instructions</h3>
        <ol>
          {!!recipe.instructions &&
            recipe.instructions
              .sort((a, b) => a.order - b.order)
              .map((inst, i) => (
                <li
                  key={`instruction_${i}`}
                  className="recipe-instruction-item"
                >
                  <span>{inst.instruction}</span>
                </li>
              ))}
        </ol>
        {/* <button onClick={() => setSelectedRecipe({})}>All</button> */}
      </div>
      <CommentsContainer
        user={user}
        recipeId={recipe.id}
        comments={recipe.comments}
      />
    </>
  );
};
