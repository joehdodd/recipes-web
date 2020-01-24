import React from "react";
import { APIContext } from "./APIContext";

const Comments = ({ comments }) => {
  return comments
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map(comment => <Comment comment={comment} />);
};
const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt);
  return (
    <div className="recipe-comment-container">
      <div className="recipe-comment-info">
        <span>{comment.user.username}</span>
        <span>{date.toDateString()}</span>
      </div>
      <span>{comment.comment}</span>
    </div>
  );
};

const CommentBox = ({ handleSubmitComment }) => {
  const [commentValue, setCommentValue] = React.useState("");
  const handleChange = e => {
    setCommentValue(e.target.value);
  };
  return (
    <>
      <textarea required onChange={e => handleChange(e)} value={commentValue}>
        Add a comment...
      </textarea>
      <button onClick={() => handleSubmitComment(commentValue)}>Add</button>
    </>
  );
};

export default ({ comments, user, recipeId }) => {
  const [recipeComments, setRecipeComments] = React.useState([...comments]);
  const apiContext = React.useContext(APIContext);
  const handleSubmitComment = comment => {
    apiContext
      .fetch(`/comments`, {
        method: "POST",
        data: {
          comment,
          recipeId
        }
      })
      .then(res => {
        console.log("res", res);
        setRecipeComments(pS => [res.data.data, ...pS]);
      })
      .catch(err => err);
  };
  return (
    <div className="content-section">
      <h3>Comments</h3>
      {!!recipeComments.length ? (
        <Comments comments={recipeComments} />
      ) : (
        <span>No comments yet!</span>
      )}
      {!!user && <CommentBox handleSubmitComment={handleSubmitComment} />}
    </div>
  );
};
