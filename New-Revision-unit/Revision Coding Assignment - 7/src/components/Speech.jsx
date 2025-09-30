import React, { useState } from 'react'

const Speech = () => {
 const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  let recognition;
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window){
    const SpeechRecognition =
      window.SpeechRecognition||window.webkitSpeechRecognition;
    recognition=new SpeechRecognition();
    recognition.continuous=true;
    recognition.interimResults=true;
    recognition.lang="en-US";
  }
  const startListening=()=>{
    if (recognition) {
      recognition.start();
      setListening(true);
      recognition.onresult=(event)=>{
        let currentTranscript="";
        for (let i=0;i<event.results.length;i++) {
          currentTranscript+=event.results[i][0].transcript+" ";
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror=(event)=>{
        console.error("Speech recognition error:", event.error);
      };
    }
  };

  const stopListening=()=>{
    if(recognition){
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <div style={{textAlign: "center", marginTop: "40px" }}>
      <h2>Speech to Text</h2>
      <div style={{ fontSize: "40px", marginBottom: "10px"}}>
        {listening ? "🔴" : "🟢"}
      </div>
      <button
        onClick={startListening}
        disabled={listening}
        style={{
          padding: "10px 20px",
          margin: "10px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Start
      </button>

      <button
        onClick={stopListening}
        disabled={!listening}
        style={{
          padding: "10px 20px",
          margin: "10px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Stop
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: "100px",
          textAlign: "left",
        }}
      >
        <p>{transcript || "Your speech will appear here..."}</p>
      </div>
    </div>
  );
}

export default Speech