import { useState } from 'react';
import './App.css';
import Pin from './components/Pin';

function App() {

  const [otp,setOtp] = useState("");

  return (
    <div className="App">
      <Pin
      lenght={4}
      setOtpHandler={(value)=>{
        setOtp(value)
      }}
      />
      <br /> 
      <h1>Otp value is : {otp}</h1>
    </div>
  );
}

export default App;