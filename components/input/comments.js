import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { useDispatch } from "react-redux";
import { loadComments } from "../../store/comments-slice";

function Comments(props) {
  const { eventId } = props;
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    if (!showComments && comments.length === 0) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // convert JSON tree to array
          console.log(data);
          dispatch(loadComments({ eventId, data }));
          const commentsArray = [];
          for (const key in data) {
            commentsArray.push({ id: key, ...data[key] });
          }
          setComments(commentsArray);
        });
    }
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
