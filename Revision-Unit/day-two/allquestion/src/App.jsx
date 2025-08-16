import Otp from "./components/Otp";
import PostList from "./components/PostsList";
import UseRef from "./components/UserRef";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Atm Card Input</h1>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "auto" }}
      >
        <UseRef />
      </div>

      <h1 style={{ textAlign: "center" }}>Otp Input</h1>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "auto" }}
      >
        <Otp />
      </div>


      <PostList/>
    </>
  );
}

export default App;
