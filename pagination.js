import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Redux/posts/postsSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { status } = useSelector((state) => state.post);
  const { error } = useSelector((state) => state.post);
//   console.log("posts", posts, status, error);
  const [currentpage, setcurrentpage] = useState(1);
  const postperpage = 10;
  const lastpostsindex = currentpage * postperpage;
  const firstpostindex = lastpostsindex - postperpage;
  const displayPosts = posts.slice(firstpostindex, lastpostsindex);
  const totalpages = Math.ceil(posts.length / postperpage);
  const totalnoofbtn=new Array(totalpages).fill(1);
  //   console.log(numbersofbtn)
  useEffect(() => {
    if (status == "idle") {
      // console.log("fetching....")
      dispatch(fetchPosts());
    }
  }, []);
  return (
    <>
      <h1>All posts</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error...{error}</p>}

      <ul>
        {displayPosts.map((post) => (
          <li key={post.id}>
            {post.id}, {post.title}
          </li>
        ))}
      </ul>

      {totalnoofbtn.map((ele, index) => (
        <button
        disabled={currentpage===index+1}
          key={index + 1}
          onClick={() => setcurrentpage(index + 1)}
          style={{ margin: "5px" }}
        >
          {index + 1}
        </button>
      ))}
    </>
  );
};

export default PostList;