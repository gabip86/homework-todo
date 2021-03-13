import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainTodo from './components/MainTodo'

function App() {
  const [auth, setAuth] = useState({ user: { username: null }, token: localStorage.getItem('accessToken') })

  return (
    <div className="app">
      <Router>
        <Header auth={auth} setAuth={setAuth} />
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/todos">
            <MainTodo />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
