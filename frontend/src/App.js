import { useState, useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Main from './components/Main'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainTodo from './components/MainTodo'
import axios from 'axios'

function App() {
  const [auth, setAuth] = useState({ user: { username: null }, token: localStorage.getItem('accessToken') })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      axios.get('http://localhost:3000/auth', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        const { username } = data
        setAuth({ ...auth, user: { username } })
      })
        .catch(console.error)
    }
  }, [auth])

  return (
    <div className="app">
      <Router>
        <Header auth={auth} setAuth={setAuth} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/todos">
            <MainTodo auth={auth} setAuth={setAuth} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
