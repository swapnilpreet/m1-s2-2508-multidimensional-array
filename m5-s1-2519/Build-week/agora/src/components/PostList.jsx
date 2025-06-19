import React from "react";
import Post from "./Post";
import "../styles/PostList.css";

const PostList = () => {
  const dummyPosts = [
    {
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    },
    {
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    },{
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    },
    {
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    },
    {
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    },
    {
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    },
    {
      user: "u/CleaningTips",
      time: "5 days ago",
      title: "For those new to deep cleaning",
      image: "https://i.redd.it/deepclean.jpg",
      likes: 1500,
      comments: 47
    }
  ];

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const q = query(ref(db, "posts"), orderByChild("createdAt"), limitToLast(50));
  //   return onValue(q, snap => {
  //     const arr = [];
  //     snap.forEach(child => arr.unshift({ id: child.key, ...child.val() }));
  //     setPosts(arr);
  //   });
  // }, []);

  return (
    <div className="post-list">
      {dummyPosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default PostList;