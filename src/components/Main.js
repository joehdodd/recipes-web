import React from "react";
import GetUsersContainer from "./user/GetUsersContainer";
import { withRouter, Route, NavLink } from "react-router-dom";
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
        <div className="nav-container">
          <NavLink className="nav-link" to="/">
            Main Area
          </NavLink>
          <NavLink className="nav-link" to="/users">
            Users Area
          </NavLink>
        </div>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h2>MAIN</h2>
            </div>
          )}
        />
        <Route path="/users" component={GetUsersContainer} />
        <LogoutButton />
      </div>
    </div>
  );
};
