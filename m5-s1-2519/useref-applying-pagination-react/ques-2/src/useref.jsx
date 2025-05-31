import React, { useRef, useState } from 'react';

function FocusInputComponent() {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleFocus=()=>{
    if(inputRef.current){
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#e0f7fa';
      setFocused(true);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      <br /><br />
      <button onClick={handleFocus} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Focus Input
      </button>
      {focused && (
        <p style={{ color: 'green', marginTop: '10px', fontWeight: 'bold' }}>
          Focused!
        </p>
      )}
    </div>
  );
}
export default FocusInputComponent;