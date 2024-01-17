import Post from "../Post";
import {useEffect, useState} from "react";
const backend_url = process.env.REACT_APP_BACKEND_URL;


export default function IndexPage() {
  const [posts,setPosts] = useState([]);
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