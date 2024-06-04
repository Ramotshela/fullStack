import React, { useEffect, useState,useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {authContext} from "../helper/helper";


function posts() {
  const [listPost, setListPost] = useState([]);
  const {authState}=useContext(authContext)
  const navigate = useNavigate();
  const [likingPost,setLikingPost]=useState({
    UserId:"",
    PostId:""
  })
  useEffect(() => {
    Axios.get("http://localhost:5174/posts").then((response) => {
      console.log(response.data);
      setListPost(response.data);
    })},[])
  
const LikePost=(id)=>{
  Axios.post("http://localhost:5174/like/like",{
    UserId:authState.id,
    PostId:id
  },{headers:{accessToken:sessionStorage.getItem("accessToken")}}).then((response)=>{
if(response.data.error){
  console.log(response.data)
}else{
  alert("liked")
}
  })
  
}
  return (
    <div className="allpost">
      {listPost.map((val, key) => {
        return (
          <div
            className="post"
            
          >
            <div key={key} className="title">
              <h3>{val.title}</h3>
            </div>
            <div className="disc" onClick={() => {
              console.log(val.id);
              navigate(`/post/${val.id}`);
            }}>{val.desc}</div>
            <div className="username">
              {" "}
              <i>written by : {val.username}</i>{" "}
              <button className="del" onClick={()=>{LikePost(val.id)}}>like</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default posts;
