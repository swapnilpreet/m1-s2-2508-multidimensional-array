import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import PinItem from "./Pininput";

const Pin = ({ lenght, setOtpHandler }) => {
  const [inputBoxValue, setinputBoxValue] = useState(
    new Array(lenght).fill("")
  );

  const inputRef = useRef([]);

  const [createinputboxes] = useState(new Array(lenght).fill(1)); 
  const hnadlechange = (e,index)=>{
    inputBoxValue[index] = e.target.value;
    setinputBoxValue(inputBoxValue);
    if (e.target.value.length > 0 && index < lenght - 1) {
      inputRef.current[index + 1].focus();
    }
    setOtpHandler(inputBoxValue.join(""));
  };

  const handlebackspace = (e, index) => {
    if (index > 0) {
      inputRef.current[index - 1].focus();
    }
    inputBoxValue[index] = e.target.value;
    setinputBoxValue(inputBoxValue);
    setOtpHandler(inputBoxValue.join(""));
  };

  const handlepaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData("text")
      .split("")
      .filter((item, index) => index < lenght);
      data.forEach((value, index) => {
        inputBoxValue[index] = value;
        inputRef.current[index].value = value;
        if (index < lenght-1) {
          inputRef.current[index + 1].focus();
        }
      })
      console.log(data);
  };
  return (
    <div
      onPaste={handlepaste} //13
      style={{ display: "flex", justifyContent: "center" }}
    >
      {createinputboxes.map((item, index) => {
        return (
          <PinItem
            key={index}
            changehandler={(e) => hnadlechange(e, index)}
            onbackspacehandler={(e) => handlebackspace(e, index)}
            ref={(element) => {
              inputRef.current[index] = element;
            }}
          />
        );
      })}
    </div>
  );
};

Pin.propTypes = {
  lenght: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pin;