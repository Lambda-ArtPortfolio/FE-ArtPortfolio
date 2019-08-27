import React from 'react';

const PostCard = ({ post, setPostEdit, deletePost }) => {
    return (
      <div>
    <p className='message'>
    Post: {post.description}
    Image: {post.image}
    </p>}
       <div className='post-card'>
        <button onClick={() => setPostEdit(post)}>Edit</button>
        <button onClick={() => deletePost(post.id)}>Delete</button>
       </div>
      </div>
    );
  };
  
  export default PostCard;