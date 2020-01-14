import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import Login from "./Login";

export default withRouter(
  ({ location, session, createSession, destroySession }) => {
    const [prevLocation, setLocation] = React.useState(location.pathname);
    const [width, setWidth] = React.useState(window.innerWidth);
    // const [height, setHeight] = React.useState(window.innerHeight);
    const [isMenuBarOpen, setMenuBar] = React.useState(false);
    const updateWidthAndHeight = () => {
      setWidth(window.innerWidth);
      // setHeight(window.innerHeight);
    };
    React.useEffect(() => {
      window.addEventListener("resize", updateWidthAndHeight);
      return () => window.removeEventListener("resize", updateWidthAndHeight);
    });
    React.useEffect(() => {
      setLocation(location.pathname);
      if (location.pathname !== prevLocation) {
        setMenuBar(false);
      }
    }, [location]);
    const handleSetMenuBar = () => {
      setMenuBar(pS => !pS);
    };
    return (
      <header
        className={`menu-bar-wrapper ${isMenuBarOpen &&
          "menu-bar-wrapper-open"}`}
      >
        <div className="nav">
          <NavLink exact activeClassName="active-nav" to={{ pathname: "/" }}>
            {"Home"}
          </NavLink>
          <NavLink
            exact
            activeClassName="active-nav"
            to={{ pathname: "/user-recipes" }}
          >
            {"Your Recipes"}
          </NavLink>
          <NavLink
            eact
            activeClassName="active-nav"
            to={{ pathname: "/add-recipe" }}
          >
            {"Add Recipe"}
          </NavLink>
          <NavLink
            exact
            activeClassName="active-nav"
            to={{ pathname: "/user-profile" }}
          >
            {"Profile"}
          </NavLink>
        </div>
        <div className="user-menu">
          {!session && (
            <>
              {width < 885 ? (
                <Link to="/login">Login</Link>
              ) : (
                location.pathname !== "/login" && (
                  <Login createSession={createSession} />
                )
              )}
              <Link to="/sign-up">Sign Up?</Link>
            </>
          )}
        </div>
        {width < 768 && (
          <div style={{ justifySelf: "center", cursor: "pointer" }}>
            <span
              style={{ color: "tomato", fontSize: "32px" }}
              onClick={() => handleSetMenuBar()}
            >
              &#9776;
            </span>
          </div>
        )}
      </header>
    );
  }
);
