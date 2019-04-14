import React from "react";
import RecipesContainer from "./RecipesContainer";

export default ({ user }) => {
  return (
    <div className="main-wrapper">
      <div className="main-container">
        <RecipesContainer user={user} />
      </div>
    </div>
  );
};
