import { readDB } from "../utils/fileHandler";


export async function getALLtodos(){
    return readDB();
}

export async function gettodosByID(id){
    const todos=await readDB();
    return todos.find((t)=>t.id===id);
}

export async function searchtodos(q){
    const todos=await readDB();
    const needle=q.toLowerCase();
    return todos.filter((t)=>t.title.toLowerCase().includes(needle));
}

export async function addTodo({title,completed=false}){
  const todos = await readDB();
  const newId = todos.length?Math.max(...todos.map((t) => t.id))+1:1;
  const todo={id:newId,title,completed};
  todos.push(todo);
  await writeDB(todos);
  return todo;
}

export async function updateTodo(id, updates) {
  const todos = await readDB();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  todos[idx] = { ...todos[idx], ...updates };
  await writeDB(todos);
  return todos[idx];
}

export async function deleteTodo(id) {
  const todos=await readDB();
  const idx=todos.findIndex((t) => t.id === id);
  if (idx===-1)return false;
  todos.splice(idx,1);
  await writeDB(todos);
  return true;
}

