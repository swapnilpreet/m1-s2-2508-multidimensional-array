import "./App.css";
import Favorite from "./Components/Favorite";
import Product from "./Components/Product";
import Search from "./Components/Search";
import Student from "./Components/Student";
import Todo from "./Components/Todo";

function App() {
  return (
    <>
      <Search />
      <Student/>
      <Favorite/>
      <Todo/>
      <Product/>
    </>
  );
}

export default App;
