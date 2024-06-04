import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./pages/posts";
import Create from "./pages/Create";
import Post from "./pages/Post";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import { authContext } from "./helper/helper";
import Axios from "axios";

function App() {
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
      <authContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="home">
            <Link to="/create">create post</Link>
            <Link to="/">Home</Link>
            {!authState ? (
              <>
                <Link to="Login">Login</Link>
                <Link to="/SignIn">register</Link>
              </>
            ) : (
              <button onClick={logout}>logout</button>
            )}
          </div>

          <Routes>
            <Route path="/SignIn" Component={SignIn} />
            <Route path="/" Component={Posts} />
            <Route path="/create" Component={Create} />
            <Route path="/post/:id" Component={Post} />
            <Route path="/Login" Component={Login} />
          </Routes>
        </Router>
      </authContext.Provider>
    </>
  );
}

export default App;
