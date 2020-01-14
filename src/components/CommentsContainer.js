import React from "react";

const Comments = ({ comments }) => {
  return comments.map(comment => <Comment comment={comment} />);
};
const Comment = ({ comment }) => {
  return (
    <div>
      <span>{comment.comment}</span>
    </div>
  );
};

export default ({ comments }) => {
  return (
    <div className="content-section">
      <h3>Comments</h3>
      <hr />
      {!!comments.lenght ? (
        <Comments comments={comments} />
      ) : (
        <span>No comments yet!</span>
      )}
    </div>
  );
};
