import "./App.css";
import PostsList from "./components/PostsList";
import TaskManager from "./components/TaskManager";
import Timer from "./components/Timer";

function App() {
  return (
    <>
      <h1>Timer</h1>
      <Timer />
      <h1>Post</h1>
      <PostsList />
      <TaskManager/>
    </>
  );
}

export default App;
