import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { authContext } from "../helper/helper";

function Comment() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(authContext);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5174/comment/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5174/comment",
        {
          comments: newComment,
          PostId: id,
        },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      );
      if (response.data.error) {
        alert("Error trying to comment");
      } else {
        console.log(response.data);
        const commentToWrite = { comments: newComment, username: authState.username };
        setComments([...comments, commentToWrite]);
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id) => {
    await axios
      .delete(`http://localhost:5174/comment/${id}`)
      .then((response) => {
        setComments(comments.filter((val)=>{
          return val.id !=id;
        }));
        
      });
  };

  return (
    <div>
      

      <div>
        {comments.map((val, key) => (
          <div className="comment" key={key}>
            {val.comments}
            <label>
              {" "}
              <i className="owner"> {val.username}</i>
            </label>
            {authState.username === val.username && (
              <button
                className="del"
                onClick={() => {
                  deleteComment(val.id);
                }}
              >
                del
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="commentInput">
        <input
          className="field"
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="comment..."
        />
        <button onClick={onSubmit}>Comment</button>
      </div>
    </div>
  );
}

export default Comment;
