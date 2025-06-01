import "./App.css";
import { useReducer, useState } from "react";
import { themeStyles } from "./styles/themeStyles";
import { initialState, themeReducer } from "./context/themeReducer";
import { countinitialState, counterReducer } from "./context/counterReducer";
import { toggleInitialState, toggleReducer } from "./context/toggleReducer";
import { forminitialState, formReducer } from "./context/formReducer";
import Collegeform from "./components/Collegeform";

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const [counterState, countedispatch] = useReducer(
    counterReducer,
    countinitialState
  );
  const [toggleState, toggledispatch] = useReducer(
    toggleReducer,
    toggleInitialState
  );
  const [formState, formdispatch] = useReducer(formReducer, forminitialState);
  const [isformFilled, setisformFilled] = useState(false);
  
  console.log(formState.email)
  console.log(formState.password);
  console.log(isformFilled)

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(formState.email && formState.password){
      setisformFilled(true);
    }else{
      setisformFilled(false);
    }
  }

  const handleReset=()=>{
    dispatch({type:"reset"});
    setisformFilled(false)
  }


  return (
    <div className={state.theme === "Light" ? "Dark" : "Light"}>
      <div>
        <h1>{state.theme}</h1>
        <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          Toggle Theme
        </button>
      </div>

      <div>
        <h1>Counter {counterState.count}</h1>
        <button onClick={() => countedispatch({ type: "Decrement" })}>
          Decrement
        </button>
        <button onClick={() => countedispatch({ type: "Increment" })}>
          Increment
        </button>
        <button onClick={() => countedispatch({ type: "Reset" })}>Reset</button>
      </div>

      <div>
        {toggleState.isVisible && <h1>Hello, World!</h1>}
        <button onClick={() => toggledispatch({ type: "TOGGLE_VISIBILITY" })}>
          Toggle Message
        </button>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Enter email here..."
              value={formState.email}
              onChange={(e) =>
                formdispatch({ type: "email", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <input type="password" placeholder="Enter password here..." 
            value={formState.password}
            onChange={(e)=>
              formdispatch({type:"password", payload:e.target.value})
            }
            required
            />
          </div>
          <button type="submit" style={{ margin: '10px' }}>Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </form>


        {isformFilled ? (
          <div style={{marginTop:"20px"}}>
            <h1>User Email: {formState.email}</h1>
            <h1>User Password: {formState.password}</h1>
          </div>
        ):(
          <div style={{marginTop:'20px'}}>No Details found</div>
        ) }
      </div>
    </div>
  );
}

export default App;
