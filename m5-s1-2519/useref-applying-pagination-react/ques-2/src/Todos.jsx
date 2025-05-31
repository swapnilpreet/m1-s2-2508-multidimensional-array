import React, { useEffect, useState } from 'react';

function TodosWithPagination() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Todos (Page {currentPage})</h2>
      <ul>
        {currentTodos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
 
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: pageNum === currentPage ? '#4caf50' : '#e0e0e0',
                color: pageNum === currentPage ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TodosWithPagination;
