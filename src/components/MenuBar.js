import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Login from "./Login";

export default withRouter(({ session, createSession, destroySession }) => {
  return (
    <header className="menu-bar-wrapper">
      <div className="nav">
        <Link to="/">
          <span
            className="site-icon"
            role="img"
            aria-label="Plate with knife and fork emoji"
          >
            🍽
          </span>
        </Link>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/user-recipes" }}
        >
          {"Your Recipes"}
        </NavLink>
        <NavLink activeClassName="active-nav" to={{ pathname: "/add-recipe" }}>
          {"Add Recipe"}
        </NavLink>
        <NavLink
          activeClassName="active-nav"
          to={{ pathname: "/user-profile" }}
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
