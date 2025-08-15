import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const limit = 5;

  const fetchData = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    )
      .then((res) => {
        const total = res.headers.get("X-Total-Count");
        settotalPages(Math.ceil(total / limit));
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  // console.log("data", Data);
  return (
    <>
      <h1>Swapnil Vijay Ramteke</h1>

      {Data?.map((item) => (
        <li key={item?.id}>
          {item?.id}.{item?.title}
        </li>
      ))}

      <div>
        {new Array(totalPages)
          .fill()
          .map((item, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              disabled={page === index + 1}
            >
              {index + 1}
            </button>
          ))}
      </div>

      <div>
        <select value={page} onChange={(e)=>setPage(Number(e.target.value))}>
             {Array(totalPages).fill().map((item,index)=>(
              <option key={index+1} value={index+1}>page {index+1}</option>
             ))}
        </select>
      </div>
    </>
  );
}

export default App;
