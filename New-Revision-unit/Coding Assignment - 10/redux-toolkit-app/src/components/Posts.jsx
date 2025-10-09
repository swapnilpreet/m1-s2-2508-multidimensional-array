import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "failed") {
    return <h1>Failed :{error}</h1>;
  }
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </div>
  );
};

export default Posts;
