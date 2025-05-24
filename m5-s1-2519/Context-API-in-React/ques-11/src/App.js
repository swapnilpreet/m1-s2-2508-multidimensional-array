import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { ThemeContext } from './store/Theme';

function App() {
  const {theme,setTheme,handletogglebtn}=useContext(ThemeContext);
  // console.log(theme,setTheme,handletogglebtn)
  return (
    <div className="App">
      <header className= {theme==='dark'?"dark":"light"}>
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handletogglebtn}>Toggle Theme</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
