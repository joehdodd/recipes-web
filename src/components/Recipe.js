import React from "react";

export default ({
  user,
  userRecipe,
  selectedRecipe,
  handleEditRecipe,
  setSelectedRecipe,
  handleFavoriteRecipe
}) => {
  return (
    <React.Fragment>
      {!!Object.keys(selectedRecipe).length && (
        <div className="content-section">
          <div className="content-section-top">
            <h1>{selectedRecipe.title}</h1>
            <div className="content-section-top-buttons">
              {/* {userRecipe && (
                <button onClick={() => handleEditRecipe()}>Edit</button>
              )} */}
              {user &&
                user.favoriteRecipes &&
                !user.favoriteRecipes.includes(selectedRecipe.id) && (
                  <button onClick={() => handleFavoriteRecipe()}>
                    Favorite
                  </button>
                )}
            </div>
          </div>
          <hr />
          <p>{selectedRecipe.description}</p>
          <h3>Ingredients</h3>
          <ul>
            {!!selectedRecipe.ingredients &&
              selectedRecipe.ingredients
                .sort((a, b) => a.order - b.order)
                .map((ing, i) => (
                  <li
                    key={`ingredient_${i}`}
                    className="recipe-ingredient-item"
                  >
                    <span>{ing.ingredient}</span>
                  </li>
                ))}
          </ul>
          <h3>Instructions</h3>
          <ol>
            {!!selectedRecipe.instructions &&
              selectedRecipe.instructions
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
          <button onClick={() => setSelectedRecipe({})}>All</button>
          <div className="content-section">
            <h3>Comments</h3>
            <hr/>
            {!!selectedRecipe.comments && !!selectedRecipe.comments.length ? (
              selectedRecipe.comments.map(comment => (
                <div>
                  <span>{comment.comment}</span>
                </div>
              ))
            ) : (
              <div>
                <span>No comments yet!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
