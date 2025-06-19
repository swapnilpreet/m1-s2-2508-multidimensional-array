// src/components/CommentSection.jsx
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  ref, push, onValue, serverTimestamp, runTransaction,
  set
} from "firebase/database";
// import "../styles/CommentSection.css";

const Comment = ({ c, depth = 0 }) => {
  const [showReply, setShowReply] = useState(false);
  const [txt, setTxt] = useState("");

  const submitReply = () => {
    if (!txt.trim()) return;
    const user = auth.currentUser;
    const rid = push(ref(db, `replies/${c.id}`)).key;
    set(ref(db,`replies/${c.id}/${rid}`), {
      id: rid,
      uid: user.uid,
      name: user.displayName || user.email,
      msg: txt.trim(),
      createdAt: serverTimestamp()
    });
    setTxt("");
    setShowReply(false);
  };

  return (
    <div className="comment" style={{ marginLeft: depth * 16 }}>
      <strong>{c.name}</strong> <span className="msg">{c.msg}</span>

      <button onClick={() => setShowReply(!showReply)}>reply</button>

      {showReply && (
        <div className="reply-box">
          <textarea value={txt} onChange={e => setTxt(e.target.value)} />
          <button onClick={submitReply}>Send</button>
        </div>
      )}

      {/* render child replies */}
      {c.replies?.map(r => (
        <Comment key={r.id} c={r} depth={depth + 1} />
      ))}
    </div>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    // listen top‑level comments
    return onValue(ref(db, `comments/${postId}`), snap => {
      const arr = [];
      snap.forEach(ch => arr.unshift(ch.val()));
      setComments(arr);
    });
  }, [postId]);

  // listen all replies for every comment
  useEffect(() => {
    const unsubs = comments.map(c =>
      onValue(ref(db, `replies/${c.id}`), snap => {
        const childs = [];
        snap.forEach(ch => childs.push(ch.val()));
        setComments(prev =>
          prev.map(p => (p.id === c.id ? { ...p, replies: childs } : p))
        );
      })
    );
    return () => unsubs.forEach(u => u());
  }, [comments]);

  const addComment = () => {
    if (!txt.trim()) return;
    const user = auth.currentUser;
    const cid = push(ref(db, `comments/${postId}`)).key;
    set(ref(db, `comments/${postId}/${cid}`), {
      id: cid,
      uid: user.uid,
      name: user.displayName || user.email,
      msg: txt.trim(),
      createdAt: serverTimestamp()
    });
    setTxt("");
  };

  return (
    <section className="comments">
      <h4>Comments</h4>

      <textarea
        placeholder="Add a comment"
        value={txt}
        onChange={e => setTxt(e.target.value)}
      />
      <button onClick={addComment}>Comment</button>

      {comments.map(c => (
        <Comment key={c.id} c={c} />
      ))}
    </section>
  );
};

export default CommentSection;
