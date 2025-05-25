import React, { useState } from 'react';

const AutoCorrectApp = () => {
  const [inputText, setInputText] = useState('');

  const corrections = {
    teh: 'the',
    recieve: 'receive',
    adress: 'address',
    wierd: 'weird',
    thier: 'their',
  };

  const getCorrectedText = (text) => {
    return text
      .split(' ')
      .map((word) => corrections[word] || word)
      .join(' ');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>AutoCorrect App</h2>
      <input
        type="text"
        placeholder="Type here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '1rem',
          marginBottom: '20px',
        }}
      />
      <h3>Corrected Preview:</h3>
      <p style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' ,color:"black" }}>
        {getCorrectedText(inputText)}
      </p>
    </div>
  );
};

export default AutoCorrectApp;
