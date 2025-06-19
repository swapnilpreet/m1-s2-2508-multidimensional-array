// src/pages/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { ref, push, serverTimestamp, set } from "firebase/database";
import "../styles/CreatePost.css";

const CreatePost = () => {
  const nav = useNavigate();
  const user = auth.currentUser;
  const [form, setForm] = useState({
    community: "",
    subtopic: "",
    text: "",
    media: "", // image or video URL
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login first");

    const newPost = {
      owner: {
        uid: user.uid,
        name: user.displayName || user.email,
        avatar: user.photoURL || "",
      },
      community: form.community.trim(),
      subtopic: form.subtopic.trim(),
      content: form.text.trim(),
      media: form.media.trim(),
      votes: 0,
      createdAt: serverTimestamp(),
    };
    const newPostRef = push(ref(db, "posts")); // returns the new location
    await set(newPostRef, newPost);
    console.log("posts added",)
  };

  return (
    <div className="create-wrapper">
      <h1>Create a Post</h1>

      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Community
          <input
            name="community"
            value={form.community}
            onChange={handleChange}
            placeholder="e.g. tech"
            required
          />
        </label>

        <label>
          Subtopic
          <input
            name="subtopic"
            value={form.subtopic}
            onChange={handleChange}
            placeholder="e.g. react"
          />
        </label>

        <label>
          Text
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            rows="5"
            placeholder="Say something..."
          />
        </label>

        <label>
          Image / Video URL
          <input
            name="media"
            value={form.media}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <button type="submit" className="btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
