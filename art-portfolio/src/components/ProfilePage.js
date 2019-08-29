import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import CreatePost from "./CreatePost";
import Posts from './Posts'
import styled from 'styled-components';

const ProfilePage = ({...props}) => {
  const [profilePage, setProfilePage] = useState([]);
  console.log(profilePage, "profilePAGE")
  
  
  useEffect(() => {
    
    axiosWithAuth()
    .get("/art")
    .then(res => {
      setProfilePage(res.data.sort((a,b) => b.id - a.id));
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
  
  const [postToEdit, setPostToEdit] = useState(null)
  const editPost =  post  => {
    const editIndex = profilePage.indexOf(postToEdit);
    const id = profilePage[editIndex].id
  
    axiosWithAuth({
      data:{
        image: post.image,
        description: post.description
      }
    })
      .put(`/art/${id}`)
      .then((res) => {
        setProfilePage(profilePage.map((submission, index) => (index === editIndex ? res.data : submission)));
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
       {profilePage.map((post, index) => {
         return(
           <Posts
           key={index}
           post = {post}
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