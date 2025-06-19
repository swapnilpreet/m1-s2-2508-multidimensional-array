// src/components/PostForm.jsx
import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    text: "",
    image: "",
    video: "",
    community: "tech",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login");

    const postObj = {
      ...post,
      username: user.displayName || user.email,
      createdAt: serverTimestamp(),
      likes: 0,
      dislikes: 0,
      shares: 0,
    };

    try {
      await addDoc(collection(db, "posts"), postObj);
      alert("Post created!");
      setPost({ title: "", text: "", image: "", video: "", community: "tech" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Text"
        value={post.text}
        onChange={(e) => setPost({ ...post, text: e.target.value })}
        required
      />
      <input
        placeholder="Image URL"
        value={post.image}
        onChange={(e) => setPost({ ...post, image: e.target.value })}
      />
      <input
        placeholder="Video URL"
        value={post.video}
        onChange={(e) => setPost({ ...post, video: e.target.value })}
      />
      <select
        value={post.community}
        onChange={(e) => setPost({ ...post, community: e.target.value })}
      >
        <option value="tech">Tech</option>
        <option value="books">Books</option>
        <option value="music">Music</option>
      </select>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
