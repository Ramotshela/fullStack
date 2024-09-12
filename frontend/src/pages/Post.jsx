import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Comment from "./comment";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    try {
      Axios.get(`http://localhost:5174/posts/getById/${id}`).then(
        (response) => {
          setPost(response.data);
        }
      );
    } catch (error) {
      console.error("error trying to load a page");
    }
  }, []);
  return (
    <div className="main" >
      
      <div className="right">
        
        <div className="post">
          <div className="title">{post.title}</div>
          <div className="desc">{post.desc}</div>
          <div className="username">
            <i> written by : {post.username}</i>
          </div>
        </div>{" "}
      </div>{" "}
      <div className="left"> <Comment  /> </div>{" "}
    </div>
  );
}

export default Post;
