import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const CreatePost = ({ list, setList, postToEdit, setPostToEdit, editPost}) => {
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
            description: post.description,
           }
        })
        .then((res) => {
          setList([ res.data, ...list])
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
            <legend className = "legend">{postToEdit ? "Edit a Post" : "Add a Post"}</legend> 
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
             Submit a Post:{" "}
             <textarea cols={30} rows={10}
                type="text"
                name="description"
                placeholder='Enter post here'
                value={post.description}
                onChange={handleChange}
             />
            </label>
        <input onClick = {handleSubmit} className = "button" type="submit" value="Submit" />    
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

.fieldbox{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
}

.legend{
  border: none;
}
`
