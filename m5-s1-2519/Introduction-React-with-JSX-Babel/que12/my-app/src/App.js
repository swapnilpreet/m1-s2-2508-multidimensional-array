import logo from './logo.svg';
import './App.css';

function App() {
  const items=["React","JavaScript","CSS"]
  return (
     <div>
      <h1>My-app</h1>
      {items.map((ele,ind)=>{
        return <p key={ind}>{ele}</p>
      })}
     </div>
  );
}

export default App;
