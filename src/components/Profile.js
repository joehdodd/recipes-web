import React from "react";
import { APIContext } from "./APIContext";

const LogoutButton = ({ destroySession }) => {
  return (
    <button
      style={{ width: 120, justifySelf: "end" }}
      onClick={() => destroySession()}
    >
      Log Out
    </button>
  );
};

export default ({ currentUser, destroySession }) => {
  const [user, setUser] = React.useState({});
  const api = React.useContext(APIContext);
  React.useEffect(() => {
    api
      .fetch(`/users/${currentUser.id}`, {
        method: "GET"
      })
      .then(res => {
        setUser(res.data.user);
      });
  }, [currentUser.id]);
  return (
    <section className="content-section">
      <div className="profile-wrapper">
        {!!user && (
          <span>
            {user.firstName} {user.lastName}
          </span>
        )}
        <LogoutButton destroySession={destroySession} />
      </div>
    </section>
  );
};
