import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import miImagen from '../assets/user-avatar.png'
import '../App.css'

export default function Login({ onLogin }) {
  const history = useHistory()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  React.useEffect(() => {
    if (localStorage.getItem('logged') === 'true') {
      history.replace('/list')
    }
  }, [history])

  function handleSubmit(e) {
    e.preventDefault()

    if (user === 'user@mail.com' && pass === '123') {
      localStorage.setItem('logged', 'true')
      onLogin()
      history.push('/list')
    } else {
      alert('Usuario o contraseña incorrectos')
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
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  )
}
