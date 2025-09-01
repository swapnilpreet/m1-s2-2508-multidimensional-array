import { useRef, useState } from "react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  let debounce=useRef(null);
  const [suggestions, setSuggestions] = useState([]);
    const fetchSuggestions = async (value) => {
    try {
        const res = await fetch(
        `https://dummyjson.com/products/search?q=${value}`
        );
        const data = await res.json();
        setSuggestions(data.products);
        console.log(data.products);
    }
    catch (err) {
        console.log(err);
    }
    };

  const handleChange=(e)=>{
    let value = e.target.value;
    setQuery(value);
    if(debounce.current){
        clearTimeout(debounce.current);
    }
    if(value.trim()===""){
        setSuggestions([]);
        return;
    }
    debounce.current=setTimeout(()=>{
        fetchSuggestions(value);
    },1500)
  }


  return (
    <>
      <h1>SearchBox</h1>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter Product name"
      />
      {suggestions.length>0 && suggestions.map((item)=>(
        <div key={item.id} style={{textAlign:"left",margin:"10px"}}>
            <h3>{item.title}</h3>       
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <hr/>
        </div>
      ))}
    </>
  );
};
export default SearchBox;

//  full execution flow of code
// 1. User types in the input field, triggering the handleChange function.
// 2. The handleChange function updates the query state with the current input value.
// 3. If there's an existing debounce timer, it gets cleared to prevent multiple API calls.
// 4. If the input value is empty (after trimming whitespace), the suggestions state is cleared, and the function exits early.
// 5. A new debounce timer is set for 1.5 seconds (1500 milliseconds). If the user types again before this timer expires, it will be cleared and reset.

// assume delay 1500ms you type the letters of swapnil quiclkly

// 1 t=0ms -> s
// handlechnage run setquery('s)
// debounce.current was null cleartimeout not run
// debounce.current = setTimeout(fetchSuggestions('s'),1500) // will run at t=1500ms

// 2 t=200ms -> w
// handlechnage run setquery('sw)
// if (debounce.current) is true clearTimeout(debounce.current) //clears the previous timer set at t=0ms fro cb('s')
// debounce.current = setTimeout(fetchSuggestions('sw'),1500) // timer id 2 scheduled to run at t=1700ms

// 3 t=400ms -> a
// handlechnage run setquery('swa)
// if (debounce.current) is true clearTimeout(debounce.current) //clears the previous timer set at t=200ms fro cb('sw')
// debounce.current = setTimeout(fetchSuggestions('swa'),1500) // timer id 3 scheduled to run at t=1900ms

// 4 t=600ms -> p   
// handlechnage run setquery('swap)
// if (debounce.current) is true clearTimeout(debounce.current) //clears the previous timer set at t=400ms fro cb('swa')
// debounce.current = setTimeout(fetchSuggestions('swap'),1500) // timer id 4 scheduled to run at t=2100ms

// 5 t=800ms -> n
// handlechnage run setquery('swapn)
// if (debounce.current) is true clearTimeout(debounce.current) //clears the previous timer set at t=600ms fro cb('swap')
// debounce.current = setTimeout(fetchSuggestions('swapn'),1500) // timer id 5 scheduled to run at t=2300ms

// 6 t=1000ms -> i
// handlechnage run setquery('swapni)
// if (debounce.current) is true clearTimeout(debounce.current) //clears the previous timer set at t=800ms fro cb('swapn')
// debounce.current = setTimeout(fetchSuggestions('swapni'),1500) // timer id 6 scheduled to run at t=2500ms

// 7 t=1200ms -> l
// handlechnage run setquery('swapnil)
// if (debounce.current) is true clearTimeout(debounce.current) //clears the previous timer set at t=1000ms fro cb('swapni')
// debounce.current = setTimeout(fetchSuggestions('swapnil'),1500) // timer id 7 scheduled to run at t=2700ms

// so repeat clears means only last timer will run