


import React from 'react'
import { useState } from 'react';

const DynamicInput = () => {
    const [input,setInput]=useState([{firstname:"",lastname:""}]);

    const handleChnage=(index,filed,value)=>{

    }

    const addInputRow=()=>{
        setInput([...input,{firstname:"",lastname:""}])
    }
    

  return(
    <div> 
        <h1>Dynamic input form</h1>

        {input.map((input,index)=>(
            <div >
                <div>
                    <label>first name</label>
                    <input type="text" value={input.firstname} onChange={(e)=>}/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default DynamicInput