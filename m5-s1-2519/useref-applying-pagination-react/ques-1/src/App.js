import './App.css';
import { useEffect,useState } from 'react';

function App() {
  const [showData,setshowData]=useState();
  const [currentPage,setcurrentPage]=useState(1);
  const [totalPages,settotalPages]=useState(0);
  // const itemsPerPage = 10;

  const fetchData=async()=>{
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      const ans=await response.json();
      setshowData(ans.results)
      settotalPages(ans.info.pages);
    } catch (error) {
      console.log("Error fetching",error)
    }
  }

  useEffect(()=>{
    fetchData();
  },[currentPage]);

  const handlePrev=()=>{
    if(currentPage>1) setcurrentPage(currentPage-1);
  }

  const handleNext=()=>{
    if(currentPage<totalPages) setcurrentPage(currentPage+1);
  }
  return (
    <>
      <div style={{padding:'20px'}}>
        <h2>Rick</h2>
        {showData?.map((char)=>(
          <div key={char.id}>
            <img src={char.image} alt={char.name} srcset={{width:"100%"}}/>
            <p>{char.name}</p>
          </div>
        ))}
      </div>

      <div>
         <button onClick={handlePrev} disabled={currentPage===1}>Prev</button>
         <button onClick={handleNext} disabled={currentPage===totalPages}>Next</button>
      </div>
    </>
  );
}

export default App;
