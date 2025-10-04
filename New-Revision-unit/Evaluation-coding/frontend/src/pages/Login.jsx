import React, { useState } from 'react'
import API from '../api/axios'
import { saveAuth } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/auth/login', { email, password })
      saveAuth(res.data)
      navigate('/')
    } catch(err){ setError(err.response?.data?.message || err.message) }
  }
  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input value={password} placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}