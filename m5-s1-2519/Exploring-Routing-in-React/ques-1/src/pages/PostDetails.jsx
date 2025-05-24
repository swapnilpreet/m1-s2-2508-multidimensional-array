import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "10px" }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Tags:</h3>
      <ul>
        {post.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    </div>
  );
};

export default PostDetails;
