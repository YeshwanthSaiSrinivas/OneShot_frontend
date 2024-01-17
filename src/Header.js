import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
const backend_url = process.env.REACT_APP_BACKEND_URL;


export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(backend_url+'profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(backend_url+'logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
