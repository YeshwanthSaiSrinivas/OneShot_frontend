import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";
import axios from 'axios';
// require("dotenv").config();
const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const formData = new FormData();
    formData.append("file",files[0]);
    formData.append("upload_preset","toxzyuph");
    console.log(formData)
    try {
      const url="https://api.cloudinary.com/v1_1/dgwycpv3z/image/upload"
      const res = await axios.post(url,formData);
      data.set('cover',res.data.url);
      const response = await fetch(backend_url+'post', {
        method: 'POST',
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
    return <Navigate to={'/'} />
  }
  return (
    
    <form onSubmit={createNewPost}>
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
      <input type="cover" disabled style={{display:'none'}} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
      
 
  );
}