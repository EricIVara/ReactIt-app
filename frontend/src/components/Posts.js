import React, { useEffect, useState } from 'react';
import { Card,Button } from 'react-bootstrap';
import axios from "axios"
import PostFormModal from './PostFormModal';
import getCookie from './Utils/getCookie';



const Posts = (props) => {
  const thread_id = props.thread_id;
  const [posts,setPosts] = useState([]);
  const [isRun, setIsRun] = useState(false);
  
  //Find out if user is Admin
  const cookieInfo = getCookie();
  let isAdmin = false;
  if(cookieInfo !== null) {
    isAdmin = cookieInfo.is_admin;
  }

  //adjust dates to match Users timezone
  function adjustForTimezone(date){
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  let d = new Date(date).toLocaleString('en-US', { timeZone: currentTimeZone });
  return d;
}
  //Axios Function to delete a post
  function deletePost(event){
    let baseURL = 'http://localhost:3001/delete-post?post_id=';
    let params = event.target.value;//Get post id from value of button
    console.log(params);
    axios.delete(baseURL+params).then((res)=>{
      setIsRun(false);//Reload page
    }
    )
    
  }

  //On load, get posts
  useEffect(()=>{
    if(isRun != true){
       axios.get(`http://localhost:3001/get-posts?thread_id=${props.thread_id}`,{ withCredentials: true }).then((res)=>{
      setPosts(res.data)
    },[isRun])
    setIsRun(true);
    }
   
  })
  return (
    <div className="tabcontainer">
      <div>
        <h1>{props.thread_name}</h1>
      </div>
      <br />
      <div>
      {//Begin Dynamic Posts
        posts.map((item,i) =>(
          <Card key={i}>
          <Card.Header as="div" className="cardheader">
           Author: {item.username} <span>Posted:{adjustForTimezone(item.post_date)}</span>
           {isAdmin && <Button onClick={deletePost} value={item.post_id}>Delete</Button>}
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="text-muted">
              {item.content}
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer className="cardheader">
            <div className="mx-auto justify-content-end text-end">
            </div>
          </Card.Footer>
        </Card>


        ))
      }{getCookie() != null ? <PostFormModal thread_id={thread_id}/>: <p><a href="/login">Login to Add Post</a></p>}
      </div>
      
    </div>
  );
};
export default Posts;
