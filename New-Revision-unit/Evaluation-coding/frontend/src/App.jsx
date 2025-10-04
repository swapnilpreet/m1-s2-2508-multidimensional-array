import React from 'react'
import { Link } from 'react-router-dom'
import './styles/main.css'

export default function App(){
  return (
    <div className="container">
      <h1>Collab Task Board</h1>
      <div className="nav">
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
      <p>Open a board link to start collaborating.</p>
    </div>
  )
}