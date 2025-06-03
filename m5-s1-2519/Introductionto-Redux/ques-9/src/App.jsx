import React from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookFilter from "./components/BookFilter";
import "./App.css";

function App() {
  return (
    <>
      <h1>Book Library</h1>
      <BookForm />
      <BookFilter />
      <BookList />
    </>
  );
}

export default App;
