import React, { useRef, useState } from "react";

const Otpinput = () => {
  const [otp, setotp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);

  const handleChange = (index, value) => {
    if(value!=="" && (isNaN(value) || value.length>1)) return;
    const pin=[...otp];
    pin[index]=value.slice(0,1);
    setotp(pin);


    if(value && index<3){
        inputRef.current[index+1].focus();
    }

  };

  const handlekeydown=(index,e)=>{
    if(e.key==='Backspace' && !otp[index] && index>0){
        inputRef.current[index-1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 4);
    console.log(pastedData)

    const pin = [...otp];
    console.log("pin",pin)
    for (let i=0;i<pastedData.length;i++) {
      pin[i]=pastedData[i];
      if (inputRef.current[i]) {
        inputRef.current[i].value = pastedData[i];
      }
    }
    console.log("pin-below",pin)
    setotp(pin);
    console.log("otp-below",otp)
    const nextIndex = pastedData.length >= 4 ? 3 : pastedData.length;
    inputRef.current[nextIndex]?.focus();
};
console.log("otp",otp)
// 8455

  return (
    <div>
      <h2>Enter Otp</h2>
      <div>
        {otp.map((ele, index) => (
          <input
            style={{padding:"20px",width:"30px"}}
            type="text"px
            value={ele}
            key={index}
            onChange={(e) => handleChange(index, e.target.value)}
            ref={(el)=>inputRef.current[index]=el}
            onKeyDown={(e)=>handlekeydown(index,e)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    </div>
  );
};

export default Otpinput;
