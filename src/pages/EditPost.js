import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import axios from 'axios';
import Editor from "../Editor";
// require("dotenv").config();
const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch(backend_url+'post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const formData = new FormData();
    formData.append("file",files[0]);
    formData.append("upload_preset","toxzyuph");
    try {
      const url="https://api.cloudinary.com/v1_1/dgwycpv3z/image/upload"
      const res = await axios.post(url,formData);
      data.set('cover',res.data.url);
      const response = await fetch(backend_url+'post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }

    
  }


  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
      
    </form>
  );
}