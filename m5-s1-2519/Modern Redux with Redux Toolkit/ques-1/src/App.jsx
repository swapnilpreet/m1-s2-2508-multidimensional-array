import './App.css'
import Cart from './components/Cart'
import Counter from './components/Counter'
import ProductList from './components/ProductList'
import TaskList from './components/TaskList'

function App() {
  return (
    <>
     <div style={{ padding: '20px' }}>
      <ProductList />
      <hr />
      <Cart />
      <hr />
      <TaskList/>
      <hr />
      <Counter />
    </div>
    </>
  )
}

export default App
