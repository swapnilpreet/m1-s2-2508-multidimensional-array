import React, { useRef } from "react";

const UseRef = () => {
  const inputRef = useRef(null);

  const formatDigits = (value) => {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };
  const handleinput = () => {
    const input = inputRef.current;
    if (!input) return;
    const { selectionStart } = input;
    let rawvalues = input.value.replace(/[^0-9]/g, "").slice(0, 16);
    const formatedvalue = formatDigits(rawvalues);
    let newCaretPos = selectionStart;
    const spacesBefore = (
      input.value.slice(0, selectionStart).match(/ /g) || []
    ).length;
    const spacesAfter = (
      formatedvalue.slice(0, selectionStart).match(/ /g) || []
    ).length;
    newCaretPos += spacesAfter - spacesBefore;
    input.value = formatedvalue;

    input.setSelectionRange(newCaretPos, newCaretPos);
    // console.log(newCaretPos,spacesBefore,spacesAfter)
  };
  const handlepaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    const input = inputRef.current;
    if (!input) return;
    const { selectionStart, selectionEnd } = input;
    const currentValue = input.value.replace(/ /g, "");
    const before = currentValue.slice(0, selectionStart);
    const after = currentValue.slice(selectionEnd);
    const newRaw = (before + pasteData + after).slice(0, 16);
    input.value = formatDigits(newRaw);
    const newCaretPos = formatDigits(before + pasteData).length;
    input.setSelectionRange(newCaretPos, newCaretPos);
  };
  return (
    <input
      style={{ padding: "8px", fontSize: "20px" }}
      ref={inputRef}
      onInput={handleinput}
      onPaste={handlepaste}
    />
  );
};

export default UseRef;
// 1412412451212145237247214
