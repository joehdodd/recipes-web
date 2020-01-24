import React from 'react';
import { Link } from 'react-router-dom';

export default ({ user, recipe, handleSelect }) => {
  return (
    <div className="recipe-row" onClick={handleSelect}>
      <Link to={`/recipe/${recipe.id}`}>
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
      </Link>
    </div>
  );
};