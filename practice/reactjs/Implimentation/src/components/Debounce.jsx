import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Debounce = () => {
  const [value, setvalue] = useState("");
  // console.log(value);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      if (response) {
        let obj={};
        response.data.products.forEach((itme)=>{
            if(obj[itme.category]!==undefined){
                obj[itme.category].push(itme)
            }else{
                obj[itme.category]=[]
            }
        });
        console.log(obj)
        var ans;
        Object.keys(obj).map((category)=>(
            obj[category].map((item)=>(
                item.title,item.price
            ))
        ))
        console.log("ans",ans)
        console.log(obj)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeid = setTimeout(() => {
        if(value){
          fetchData(value);
        }
    }, 2000);
    return ()=> clearTimeout(timeid);
  }, [value]);


  return (
    <>
      <h1>Debounce</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setvalue(e.target.value)}
      />
    </>
  );
};
export default Debounce;
