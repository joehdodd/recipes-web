import React from "react";
import { withRouter } from "react-router-dom";
// import UsersContainer from "./UsersContainer";
import RecipesContainer from "./RecipesContainer";
import Authentication from "../utils/Authentication";

const LogoutButton = withRouter(({ history }) => (
  <button
    onClick={() => {
      Authentication.destroy();
      history.push("/");
    }}
  >
    Log Out
  </button>
));

export default props => {
  return (
    <div className="main-wrapper">
      <div className="main-container">
        <RecipesContainer />
        <LogoutButton />
      </div>
    </div>
  );
};
