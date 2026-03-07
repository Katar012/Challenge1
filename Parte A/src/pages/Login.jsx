import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import miImagen from '../assets/user-avatar.png'
import '../App.css'

export default function Login({ onLogin }) {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('recepcionista')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.replace('/dashboard')
    }
  }, [history])

  function handleSubmit(e) {
    e.preventDefault()

    // mock credentials
    if (email === 'user@mail.com' && password === '123') {
      const u = {
        email,
        name: 'Usuario de prueba',
        role,
      }
      localStorage.setItem('user', JSON.stringify(u))
      onLogin(u)
      history.push('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="app login">
      <header>
        <img src={miImagen} alt="Logo" />
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="recepcionista">Recepcionista</option>
            <option value="medico">Médico</option>
          </select>
          {error && <div className="error">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  )
}
