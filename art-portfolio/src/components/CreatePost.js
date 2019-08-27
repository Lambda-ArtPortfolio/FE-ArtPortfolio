import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CreatePost = ({ list, setList, postEdit, setPostEdit, editPost }) => {
const [post, setPost] = useState({ message: ""});

useEffect(() => {

    if (postEdit) {
        setPost(postEdit)
    }

    }, [postEdit])


    const handleChange = e => {
        const updatedPost = {
            ...post,
            [e.target.name]: e.target.value
        };
        setPost(updatedPost)
    };

    const handleSubmit = e => {
    e.preventDefault();
    if (postEdit) {
        editPost(post);
        setPostEdit(null);
    } else if (
        post.message !== "" 
    ) {

      const sendPost = () => {
        axios({
          url:'https://art-portfolio-bw.herokuapp.com/art/',
          method: 'post',
          headers: {
            Authorization: localStorage.getItem('token')
          },
          data:{
            message: post.message
           }
        })
        .then((res) => {
          setList([ res.data.portfolio, ...list])
        })
        .catch(err => {
        })
      }
      sendPost();

        
    }
        setPost({ message: "" });
  };
    

    return (
     <form onSubmit={handleSubmit}>
      <fieldset className = "fieldbox"> 
            <legend className = "legend">{postEdit ? "Edit a Post" : "Add a Post"}</legend> 
            <label htmlFor="message">

             <textarea cols={30} rows={10}
                type="text"
                name="message"
                placeholder="Details of your submission"
                value={post.message}
                onChange={handleChange}
             />
            </label>
        <input className = "button" type="submit" value="Submit" />    
      </fieldset>
     </form>
     

    );

};

export default CreatePost
