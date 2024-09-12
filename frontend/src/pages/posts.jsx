import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../helper/helper";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

function posts() {
  const [listPost, setListPost] = useState([]);
  const { authState } = useContext(authContext);
  const [checkLike, setCheckLike] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:5174/posts",
      { headers: { accessToken: sessionStorage.getItem("accessToken") } }).then((response) => {
      setListPost(response.data.post);
console.log(response.data)
      setCheckLike(
        response.data.LikedPosts.map((like) => {
          return like.PostId;
        })
      );
    });
  }, []);

  const LikePost = async (id) => {
    await Axios.post(
      "http://localhost:5174/like/like",
      {
        PostId: id,
      },
      { headers: { accessToken: sessionStorage.getItem("accessToken") } }
    ).then((response) => {
      setListPost(
        listPost.map((listOfPost) => {
          if (response.data.liked) {
            return { ...listOfPost, Likes: [...listOfPost.Likes, 0] };
          } else {
            const listArray = listOfPost.Likes;
            listArray.pop();
            return { ...listOfPost, Likes: listArray };
          }
        })
      );
      if (checkLike.includes(id)) {
        checkLike.filter((likeId) => {
          return likeId != id;
        });
      } else {
        setCheckLike([...checkLike, id]);
      }
    });
  };

  return (
    <div className="allpost">
      {listPost.map((val, key) => {
        return (
          <div className="post" key={key}>
            <div key={key} className="title">
              <h3>{val.title}</h3>
            </div>
            <div
              className="disc"
              onClick={() => {
                console.log(val.id);
                navigate(`/post/${val.id}`);
              }}
            >
              {val.desc}
            </div>
            <div className="username">
              {" "}
              <i>written by : {val.username}</i>{" "}
              {
                <>
                  {checkLike.includes(val.id) ? (
                    <ThumbUpAltIcon
                      onClick={() => {
                        LikePost(val.id);
                      }}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      onClick={() => {
                        LikePost(val.id);
                      }}
                    />
                  )}
                </>
              }
              {val.Likes.length}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default posts;
