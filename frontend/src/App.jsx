import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link,  useNavigate } from "react-router-dom";
import Posts from "./pages/posts";
import Create from "./pages/Create";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import { authContext } from "./helper/helper";
import Axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Message from "./pages/message/Message";
import contact from "./pages/message/Contact";
import Info from './pages/Info'


function App() {

  const [contactState,setContactState]=useState({
    name:'',
    number:''
  })
  useEffect(() => {
    Axios
      .get("http://localhost:5174/contactInfo/getContact", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
        setContactState(response.data);
       
      });
  }, []);
  
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    try {
      Axios.get("http://localhost:5174/auth/auth", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setAuthState(false);
    
  };

  return (
    <>
      <authContext.Provider value={{ authState, setAuthState ,contactState,setContactState}}>
        <Router>
          <div className="home">
            <Link to="/create">create post</Link>
            <Link to="/posts">Home</Link>
            {!authState ? (
              <>
                <Link to="/">Login</Link>
                <Link to="/SignIn">register</Link>
              </>
            ) : (<><Link to="/chat">chat</Link>
              <Link to="/info">info</Link>
              <button onClick={logout}>logout</button></>
              
            )}
          </div>

          <Routes>
          <Route path="/chat" Component={contact}/>
           // <Route path="/message" Component={Message}/>
            <Route path="*" Component={PageNotFound}/>
            <Route path="/SignIn" Component={SignIn} />
            <Route path="/posts" Component={Posts} />
            <Route path="/create" Component={Create} />
            <Route path="/info" Component={Info} />
            <Route path="/post/:id" Component={Post} />
            <Route path="/contact/:id" Component={Message} />
            <Route path="/" Component={Login} />
          </Routes>
        </Router>
      </authContext.Provider>
    </>
  );
}

export default App;
