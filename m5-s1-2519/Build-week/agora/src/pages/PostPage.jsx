// src/pages/PostPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, runTransaction } from "firebase/database";
import CommentSection from "../components/CommentSection";
import "../styles/PostPage.css";

const PostPage = () => {
  const { pid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    return onValue(ref(db, `posts/${pid}`), s => setPost({ id: pid, ...s.val() }));
  }, [pid]);

  const vote = delta => {
    runTransaction(ref(db, `posts/${pid}/votes`), cur => (cur || 0) + delta);
  };

  if (!post) return <p>Loading…</p>;

  return (
    <div className="post-page">
      <div className="post">
        <h2>{post.community} / {post.subtopic}</h2>
        <p>{post.content}</p>

        {post.media && (
          post.media.endsWith(".mp4")
            ? <video controls src={post.media} className="media" />
            : <img src={post.media} alt="" className="media" />
        )}

        <div className="actions">
          <button onClick={() => vote(1)}>⬆️</button>
          <span>{post.votes || 0}</span>
          <button onClick={() => vote(-1)}>⬇️</button>

          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            🔗 Share
          </button>
        </div>
      </div>

      <CommentSection postId={pid} />
    </div>
  );
};

export default PostPage;
