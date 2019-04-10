import React from "react";
import RecipesContainer from "./RecipesContainer";
import { AuthContext } from "./AuthenticationContext";

const LogoutButton = () => {
  const auth = React.useContext(AuthContext);
  return <button onClick={() => auth.destroy()}>Log Out</button>;
};

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
