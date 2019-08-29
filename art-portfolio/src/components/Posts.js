import React from "react";
import styled from "styled-components"

const Post = ({deletePost, setPostToEdit, post, ...props}) => {
  console.log("postToEdit",setPostToEdit)
  return (
  <PostContainer className = "container">
  <div className = "posts">
    <img className = "images" src = {post.image} />
    <p>Description: {post.description}</p>
    <button className="del-btn" onClick={e => deletePost(e, post.id)}> X </button>
    <button className= "edit-btn" onClick={() => setPostToEdit(post)}>EDIT ME</button>
  </div>  
  
</PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`

.posts{
    background: #6A7D64;
    width: 400px;
    display: flex;
    flex-direction: column;
    border: 2px solid #6A7D64;
    margin: 2rem;
    text-align: center;
    border-radius: 8px;
    justify-content: center;
    align-self: flex-start;
    min-height: 620px;
    
    
}

.images{
  max-height: 500px;
  min-height: 500px;
  border-radius-top: 8px;
  object-fit: cover
  filter: contrast(80%)
    
}
.images:hover{
    filter: contrast(100%)
}

.edit-btn{
    width: 50%;
    margin: 0 auto;
}

.del-btn{
    display: inline-block;
    position: relative;
    bottom: 33rem;
    left:20rem;
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 60px;
    height: 60px;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 50%;
    border: solid rgba(79,99,134, .10);
}
`