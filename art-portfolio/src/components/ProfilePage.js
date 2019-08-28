import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import CreatePost from "./CreatePost";
import Posts from './Posts'
import styled from 'styled-components';

const ProfilePage = ({updatedPost, post, list, setList, postEdit, ...props}) => {
  const [profilePage, setProfilePage] = useState([]);
  const [postToEdit, setPostToEdit]= useState(null);  

  useEffect(() => {
    // console.log(postToEdit);
    axiosWithAuth()
    .get("/art")
    .then(res => {
        setProfilePage(res.data)
        console.log("res",res)
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }, []);

  const deletePost = (e, id) => {
    e.stopPropagation();
    axiosWithAuth()
      .delete(`/art/${id}`)
      .then(res => {
        setProfilePage(profilePage.filter(post => post.id !== id ));
      })
      .catch(err => {
        console.log("Err: ", err);
      });
  };

  const editPost = (e, post, id) => {
  const editIndex = list.indexOf(postToEdit);
  debugger 
    e.preventDefault();
    axiosWithAuth()
      .put(`/art/${id}`)
      .then(res => {
        setProfilePage(profilePage.map((info, index) => (index === editIndex ? post : info)));
      })
      .catch(err => {
        console.log("Err: ", err);
      });
  };




  return (
  
   <div>
      <CreatePost {...props}
      profilePage={profilePage}
      setProfilePage={setProfilePage}
      postToEdit={postToEdit}
      setPostToEdit={setPostToEdit}
      editPost={editPost}
      
      />
      
     <PostList>
       {profilePage.map((item, index) => {
         return(
           <Posts
           key={index}
           item = {item}
           setPostToEdit={setPostToEdit}
           deletePost = {deletePost}
           />
         )
         })}
      </PostList>
  </div>
  
  );
};

export default ProfilePage;

const PostList = styled.div`
display: -webkit-flex;
	display: flex;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
	margin-top: 15px;
	padding: 1.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
`