import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Login from "./Login";

export default withRouter(({ session, createSession, destroySession }) => {
  return (
    <header className="menu-bar-wrapper">
      <div className="nav">
        <NavLink to="/" activeClassName="active-nav">
          <span
            className="site-icon"
            role="img"
            aria-label="Plate with knife and fork emoji"
          >
            🍽
          </span>
        </NavLink>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/user-recipes", state: { title: "Your Recipes" } }}
        >
          {"Your Recipes"}
        </NavLink>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/add-recipe", state: { title: "Add Recipe" } }}
        >
          {"Add Recipe"}
        </NavLink>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/user-profile", state: { title: "Profile" } }}
        >
          {"Profile"}
        </NavLink>
      </div>
      <div className="user-menu">
        {!session && (
          <>
            <Login createSession={createSession} />
            <Link to="/sign-up">Sign Up?</Link>
          </>
        )}
      </div>
    </header>
  );
});
