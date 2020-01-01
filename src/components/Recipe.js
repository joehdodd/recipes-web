import React from "react";

export default ({ selectedRecipe, handleEditRecipe, setSelectedRecipe }) => (
  <React.Fragment>
    {!!Object.keys(selectedRecipe).length && (
      <div className="content-section">
        <div className="content-section-top">
          <h1>{selectedRecipe.title}</h1>
          <button onClick={() => handleEditRecipe()}>Edit</button>
        </div>
        <hr />
        <p>{selectedRecipe.description}</p>
        <h3>Ingredients</h3>
        <ul>
          {!!selectedRecipe.ingredients &&
            selectedRecipe.ingredients.map(ing => (
              <li className="recipe-ingredient-item">
                <span>{ing}</span>
              </li>
            ))}
        </ul>
        <h3>Instructions</h3>
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
    )}
  </React.Fragment>
);
