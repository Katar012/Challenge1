import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/List' // List now acts as dashboard
import PerfilUsuario from './components/PerfilUsuario'

function App() {
  // user object stored in localStorage under "user"; null means no session
  const [user, setUser] = useState(() => {
    const json = localStorage.getItem('user')
    return json ? JSON.parse(json) : null
  })

  function handleLogin(u) {
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
  }

  function updateUser(u) {
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
  }

  function handleLogout() {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
        </Route>

        <Route path="/dashboard">
          {user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/perfil">
          {user ? (
            <PerfilUsuario user={user} onUpdate={updateUser} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        {/* catch‑all redirect back to login */}
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
