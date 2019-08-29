import React from "react";
import styled from "styled-components"

const Post = ({deletePost, setPostToEdit, post, ...props}) => {
  console.log("postToEdit",setPostToEdit)
  return (
  <PostContainer className = "container">
  <div className = "posts">
    <img className = "images" src = {props.item.image} />
    <p>Description: {props.item.description}</p>
    <button className="del-btn" onClick={e => deletePost(e, props.item.id)}> X </button>
    <button className= "edit-btn" onClick={e => setPostToEdit(e, post)}>EDIT ME</button>
  </div>  
  {console.log("postToEdit",setPostToEdit)}
</PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`

.posts{
    background: white;
    width: 400px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin: 2rem;
    text-align: center;
    border-radius: 8px;
    justify-content: center;
    align-self: flex-start;
    min-height: 400px;
    border: 1.8px solid #aacddf;
    
}

.images{
  max-height: 500px;
  border-radius-top: 8px;
  object-fit: cover
  filter: contrast(70%)
    
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