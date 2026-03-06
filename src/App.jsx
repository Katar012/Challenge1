import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import List from './pages/List'

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('logged') === 'true'
  )

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Redirect to="/list" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login onLogin={() => setAuthenticated(true)} />
        </Route>

        <Route path="/list">
          {authenticated ? (
            <List
              onLogout={() => {
                localStorage.removeItem('logged')
                setAuthenticated(false)
              }}
            />
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
