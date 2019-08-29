import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import CreatePost from "./CreatePost";
import Posts from './Posts'
import styled from 'styled-components';

const ProfilePage = ({updatedPost, list, setList, postEdit, ...props}) => {
  const [profilePage, setProfilePage] = useState([]);


  useEffect(() => {
  
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
  const [editedPost, setEditedPost] = useState(null)
  const editPost = (post) => {
  const editIndex = profilePage.indexOf(post);

  const id = profilePage[editIndex].id
   // e.preventDefault();
    axiosWithAuth({
      data: {
        description: post.description,
        image: post.image
      }
      })
      .put(`/art/${id}`)
      .then(res => {
        setProfilePage(
          profilePage.map((post,index) => (index === editIndex ? res.data.art : post)),
        );
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  return (
  
   <div>
      <CreatePost {...props}
      list={list}
      setList={setList}
      editPost={editPost}
      setEditedPost={setEditedPost}
      postEdit={editedPost}
      />
      
     <PostList>
       {profilePage.map(item => {
         return(
           <Posts
           item = {item}
           deletePost = {deletePost}
           editPost = {editPost} />
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