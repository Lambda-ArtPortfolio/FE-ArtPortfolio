import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialPost ={
  posts: "",
  //img
}

const UserProfile = ({ post, updatePost }) => {
  console.log(post)
    const [editing, setEditing] = useState(false);
    const [postToEdit, setPostToEdit] = useState(initialPost);
    const [addPost, setAddPost] = useState(initialPost);

    const editPost = posts => {
      setEditing(true);
      setPostToEdit(posts);
    };

    const cancelAdd = e => {
      e.preventDefault();
      setAddPost(initialPost);
    };

    const addedPost = e => {
      e.preventDefault();
    
    if (addPost.posts !== "" && addPost.image !== "") {
      axiosWithAuth()
      .post("/art", addPost)
      .then(res => {
        updatePost(res.data);
        setAddPost(initialPost);
      })
      .catch(err => {
        console.log("err", err);
      })
     }
    }

    const saveEdit = e => {
      e.preventDefault();
      axiosWithAuth()
      .put(`/art/${postToEdit.id}`, postToEdit)
      .then(res => {
        updatePost(
          post.map(posts => (posts.id === postToEdit.id ? res.data : posts)),
        );
        setEditing(false);
      })
      .catch(err => {
        console.log("err", err)
      });
    };

    const deletePost = (e, posts) => {
      e.stopPropagation();
      axiosWithAuth()
        .delete(`/art/${posts.id}`)
        .then(res => {
          updatePost(post.filter(posts => posts.id !== res.data));
        })
        .catch(err => {
          console.log("Err: ", err);
        });
    };
  
  return (
      
    <div className="posts">
      <p>Posts</p>
      <ul>
        {post.map(posts => (
          <li key={posts.posts} onClick={() => editPost(posts)}>
            <span>
              <span className="delete" onClick={e => deletePost(e, posts)}>
                x
              </span>{" "}
              {posts.posts}
            </span>
          </li>
        ))}
      </ul>
      {editing ? (
        <form className ="edit-post" onSubmit={saveEdit}>
          <legend className = "edit-button">edit post</legend>
          <label>
            description:
            <input
              onChange={e =>
                setPostToEdit({ ...postToEdit, posts: e.target.value })
              }
              value={postToEdit.posts}
            />
          </label>
          {/* <label>
            Image:
            <input
              onChange={e =>
                setPostToEdit({
                  ...PostToEdit,
                  image: { URL: e.target.value }
                })
              }
              value={PostToEdit.image.URL}
            />
          </label> */}
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      ) : (
    <form className = "added-post" onSubmit={addedPost}>
    <legend>add post</legend>
    <label>
      Description:
      <input
        onChange={e =>
          setAddPost({ ...addPost, posts: e.target.value })
        }
        value={addPost.posts}
      />
    </label>
    {/* <label>
      image:
      <input
        onChange={e =>
          setAddPost({
            ...addPost,
            image: { img.url },
          })
        }
        value={addPost.img.url}
      />
    </label> */}
    <div className="button-row">
      <button type="submit">add</button>
      <button onClick={cancelAdd}>cancel</button>
    </div>
  </form>
      )}
    </div>
  )
};
  
export default UserProfile;