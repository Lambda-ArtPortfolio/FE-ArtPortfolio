import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const CreatePost = ({ profilePage, setProfilePage, postToEdit, setPostToEdit, editPost}) => {
const [post, setPost] = useState({image: "", description: ""});

useEffect(() => {
    if (postToEdit) {
        setPost(postToEdit)
    }

    }, [postToEdit])


    const handleChange = e => {
        const updatedPost = {
            ...post,
            [e.target.name]: e.target.value
        };
        setPost(updatedPost)
    };

    const handleSubmit = e => {
      debugger
    e.preventDefault();
    if (postToEdit) {
        editPost(post);
        setPostToEdit(null);
    } else if (
        post.image !== "" && 
        post.description !== "" 
    ) {

      const sendPost = () => {
        
        axios({
          url:'https://art-portfolio-bw.herokuapp.com/art',
          method: 'post',
          headers: {
            Authorization: localStorage.getItem('token')
          },
          data:{
            image: post.image,
            description: post.description
           }
        })
        .then((res) => {
          setProfilePage([ res.data, ...profilePage])
        })
        .catch(err => {
        })
      }
      sendPost();
    }
    setPost({ image: "", description: "" });
  };
    

    return (
      <div>
     <Form>
     <form onSubmit={handleSubmit}>
      <fieldset className = "fieldbox"> 
            <p className = "legend">{postToEdit ? "Edit Post" : "New Post"}</p> 
            <label htmlFor="image">
             Image:{" "}
             <input className = "image"
                type="text"
                name="image"
                placeholder="Upload and Image"
                value={post.image}
                onChange={handleChange}
              />
            </label>
  
            <label htmlFor="description">
             Add a description:
             <textarea cols={75} rows={10}
                type="text"
                name="description"
                placeholder={postToEdit ? post.description :'Describe your work'}
                value={post.description}
                onChange={handleChange}
             />
            </label>
        <input className = "button" type="submit" value="Submit" />    
       </fieldset>
      </form> 
     </Form>
     </div>

    );

};

export default CreatePost;

const Form = styled.div`
background-color: light purple;
margin: 0 auto;
margin-top: 40px;
border: 2px solid #E3E1E1;
border-radius: 12px;
box-shadow: 5px 5px 8px #BFBFBF;
width: 30%;
align-items: center;
height: 300px;
display: flex;
justify-content: center;

textarea{
  display: flex;
  width: 97%;
}

.form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
}

input{
  display: flex;
  flex-direction: column;
}

.fieldbox{
  display: flex;
  flex-direction: column;
  border: none;
}

.legend{
  text-align: center;
}
`
