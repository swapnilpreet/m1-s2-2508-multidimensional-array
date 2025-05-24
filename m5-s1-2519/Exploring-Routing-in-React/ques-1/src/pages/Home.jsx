import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Blog Posts</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "20%" }}
      />
      {filteredPosts.map(post => (
        <div key={post.id} style={{ marginBottom: "1rem" }}>
          <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
          <p>{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
