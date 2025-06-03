
export const INCREMENT='INCREMENT';
export const DECREMENT="DECREMENT";
export const RESET="RESET";
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';


export const increment=()=>({type:INCREMENT});
export const descremnt=()=>({type:DECREMENT});
export const reset=()=>({type:RESET});
export const addTodo = (title) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    title,
    status: false
  }
});
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});