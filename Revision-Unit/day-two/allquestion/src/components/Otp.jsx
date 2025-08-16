import React, { useRef, useState } from "react";

const Otp=()=>{
  const [values,setValues]=useState(["", "", "", ""]);
  const inputRef=useRef([]);

  const handleChange=(val,index)=>{
    const newValues=[...values];
    newValues[index]=val;
    setValues(newValues);
    if (val!==""){
      moveNext(index);
    }
  };

  const moveNext=(index)=>{
    if (inputRef.current[index+1]) {
      inputRef.current[index+1].focus();
    }
  };
 
  const movePrevious=(index)=>{
    if (inputRef.current[index-1]) {
      inputRef.current[index-1].focus();
    }
  };
 
  const handlePrevious=(e,index)=>{
    if (e.key==="Backspace"&&values[index]==="") {
      movePrevious(index);
    }
  };

  const handlePasteValue=(e)=>{
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, 4)
      .replace(/[^0-9]/g, "");
    setValues(pasteData.padEnd(4, "0").split(""));
    if (inputRef.current[3]) inputRef.current[3].focus();
  };

  return (
    <div style={{display:"flex",gap:"10px"}}>
      {values.map((val,index)=>(
        <input
          key={index}
          type="text"
          maxLength={1}
          value={val}
          onChange={(e)=>handleChange(e.target.value.replace(/[^0-9]/g, ""), index)}
          onKeyDown={(e)=>handlePrevious(e,index)}
          onPaste={handlePasteValue}
          ref={(el)=>(inputRef.current[index]=el)}
          style={{width:"40px",height:"40px",fontSize:"35px"}}
        />
      ))}
    </div>
  );
};

export default Otp;
// 8648