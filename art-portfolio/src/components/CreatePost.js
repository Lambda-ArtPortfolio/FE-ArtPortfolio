import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CreatePost = ({ list, setList, setEditedPost, editedPost, postEdit }) => {
const [post, setPost] = useState({image: "", description: ""});

useEffect(() => {

    if (editedPost) {
        setPost(editedPost)
    }

    }, [editedPost])


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
        postEdit(post);
        setEditedPost(null);
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
          setList([ res.data.art, ...list])
        })
        .catch(err => {
        })
      }
      sendPost();

        
    }
        setPost({ image: "", description: "" });
  };
    

    return (
     <form onSubmit={handleSubmit}>
      <fieldset className = "fieldbox"> 
            <legend className = "legend">{editedPost ? "Edit a Post" : "Add a Post"}</legend> 
            <label htmlFor="image">
             Image:{" "}
             <input className = "image"
                type="text"
                name="image"
                placeholder="Upload and Image"
                value={post ? post.image : "?"}
                onChange={handleChange}
              />
            </label>
  
            <label htmlFor="description">
             Submit a Post:{" "}
             <textarea cols={30} rows={10}
                type="text"
                name="message"
                placeholder="Enter Post Here"
                value={post.description}
                onChange={handleChange}
             />
            </label>
        <input className = "button" type="submit" value="Submit" />    
      </fieldset>
     </form>
     

    );

};

// const initialPost = {
//   description: "",
//   image: {file: ''}
// }

// const CreatePost = ({ posts, updatePosts }) => {
//   console.log(posts);
//   const [editing, setEditing] = useState(false);
//   const [postToEdit, setPostToEdit] = useState(initialPost);
//   const [addPost, setAddPost] = useState(initialPost);

//   const editPost = post => {
//     setEditing(true);
//     setPostToEdit(post);
//   };

//   const cancelAdd = e => {
//     e.preventDefault();
//     setAddPost(initialPost);
//   };

//    const addedPost = e => {
//     e.preventDefault();

//      if (addPost.description !== "" && addPost.image !== {}) {
//       axiosWithAuth()
//         .post("/art", addPost)
//         .then(res => {
//           updatePosts(res.data);
//           setAddPost(initialPost);
//         })
//         .catch(err => {
//           console.log("Error: ", err);
//         });
//     }
//   };

//   const saveEdit = e => {
//     e.preventDefault();
//     axiosWithAuth()
//       .put(`/art/${postToEdit.id}`, postToEdit)
//       .then(res => {
//         updatePosts(
//           posts.map(post => (post.id === postToEdit.id ? res.data : post)),
//         );
//         setEditing(false);
//       })
//       .catch(err => {
//         console.log("Error: ", err);
//       });
//   };

//   const deletePost = (e) => {
//     e.stopPropagation();
//     axiosWithAuth()
//       .delete(`/art`)
//       .then(res => {
//         updatePosts(posts.filter(post => post.id !== res.data));
//       })
//       .catch(err => {
//         console.log("Err: ", err);
//       });
//   };
//   return (
//     <div className="Posts">
//       <p>Posts</p>
//       <ul>
//         {posts.map(data => (
//           <li key={data.post} onClick={() => editPost(data)}>
//             <span>
//               <span className="delete" onClick={e => deletePost(e)}>
//                 x
//               </span>{" "}
//               {data.post}
//             </span>
//             <div className="post-box"/>
//           </li>
//         ))}
//       </ul>
//       {editing ? (
//         <form className ="edit-post" onSubmit={saveEdit}>
//           <legend className = "edit-button">edit post</legend>
//           <label>
//             description:
//             <input
//               onChange={e =>
//                 setPostToEdit({ ...postToEdit, post: e.target.value })
//               }
//               value={postToEdit.post}
//             />
//           </label>
//           <label>
//             image:
//             <input
//               onChange={e =>
//                 setPostToEdit({
//                   ...postToEdit,
//                   image: {file: ''}
//                 })
//               }
//               value={postToEdit.image.file}
//             />
//           </label>
//           <div className="button-row">
//             <button type="submit">save</button>
//             <button onClick={() => setEditing(false)}>cancel</button>
//           </div>
//         </form>
//       ) : (
//     <form className = "added-post" onSubmit={addedPost}>
//     <legend>add post</legend>
//     <label>
//       description
//       <input
//         onChange={e =>
//           setAddPost({ ...addPost, post: e.target.value })
//         }
//         value={addPost.post}
//       />
//     </label>
//     <label>
//       image:
//       <input
//         onChange={e =>
//           setAddPost({
//             ...addPost,
//             image: { file: e.target.value },
//           })
//         }
//         value={addPost.image.file}
//       />
//     </label>
//     <div className="button-row">
//       <button type="submit">add</button>
//       <button onClick={cancelAdd}>cancel</button>
//     </div>
//   </form>
//       )}
//     </div>
//   )
// };

export default CreatePost
