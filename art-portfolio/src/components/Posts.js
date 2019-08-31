import React from "react";
import styled from "styled-components"

const Post = ({deletePost, setPostToEdit, post, ...props}) => {
  console.log("postToEdit",setPostToEdit)
  return (
  <PostContainer className = "container">
  <div className = "posts">
    <img alt='' className = "images" src = {post.image} />
    <p>Description: {post.description}</p>
    <button className="del-btn" onClick={e => deletePost(e, post.id)}> X </button>
    <button className= "edit-btn" onClick={() => setPostToEdit(post)}>Edit</button>
  </div>  
  
</PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`

.posts{
    background: #C6CFC4;
    width: 400px;
    display: flex;
    flex-direction: column;
    border: 2px solid #6A7D64;
    margin: 2rem;
    text-align: center;
    border-radius: 8px;
    justify-content: center;
    align-self: flex-start;
    min-height: 455px;
    
    
}

.images{
  max-height: 330px;
  min-height: 300px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  object-fit: cover
  filter: contrast(80%)
    
}
.images:hover{
    filter: contrast(100%)
}

.edit-btn{
    width: 60px;
    margin: 0 auto;
    margin-bottom: 5px;
    border-radius: 5px;
}

.del-btn{
    display: inline-block;
    position: relative;
    bottom: 23rem;
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

    :hover{
      background: white;
    }
}
`