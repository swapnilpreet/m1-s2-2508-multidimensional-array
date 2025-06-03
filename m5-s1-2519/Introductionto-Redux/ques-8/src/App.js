import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTodo, deleteTodo, descremnt, increment, reset, toggleTodo } from "./redux/actions";
import { useState } from "react";
import BookForm from "./components/BookForm";
import BookFilter from "./components/BookFilter";
import BookList from "./components/BookList";

function App() {
  const { count } = useSelector((state) => state.counter);
  const { todos } = useSelector((state) => state.todos);
  // console.log(count)
  const dispatch = useDispatch();
  const [todoTitle, setTodoTitle] = useState('');

  return (
    <div>
      <h1>Redux Counter</h1>
      <h3>Counter:{count}</h3>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(descremnt())}>Descremnt</button>
      <button onClick={() => dispatch(reset())}>Reset</button>


      {/* Todo Input */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Todo List</h2>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={() => {
          if (todoTitle.trim()) {
            dispatch(addTodo(todoTitle));
            setTodoTitle('');
          }
        }}>
          Add Todo
        </button>
      </div>

       {/* Todo List */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.status ? 'line-through' : 'none',
                marginRight: '10px'
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.status ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ marginLeft: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="container">
    <h1>Book Library</h1>
    <BookForm />
    <BookFilter />
    <BookList />
  </div>

    </div>
  );
}

export default App;
