import Post from "../Post";
import {useEffect, useState, useContext} from "react";
import { UserContext } from "../UserContext";
import Header from "../Header";
const backend_url = process.env.REACT_APP_BACKEND_URL;


export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  const {userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(backend_url+'post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}