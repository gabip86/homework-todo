import { useState, useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Main from './components/Main'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainTodo from './components/MainTodo'
import axios from 'axios'

function App() {
  const [auth, setAuth] = useState({
    user: { username: null, userId: null },
    token: localStorage.getItem('accessToken')
  })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      axios.get('http://localhost:3000/auth', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        const { username, id } = data
        setAuth({ ...auth, user: { username, id } })
      })
        .catch(console.error)
    }
  }, [auth])

  const routes = (auth, setAuth) => {
    return [
      {
        allowed: !auth?.user?.username,
        path: "/register",
        children: <Register />,
        redirectPath: "/todos"
      },
      {
        allowed: !auth?.user?.username,
        path: "/login",
        children: <Login auth={auth} setAuth={setAuth} />,
        redirectPath: "/todos"
      },
      {
        allowed: auth?.user?.username,
        path: "/todos",
        children: <MainTodo auth={auth} setAuth={setAuth} />,
        redirectPath: "/login"
      },
    ]
  }

  return (
    <div className="app">
      <Router>
        <Header auth={auth} setAuth={setAuth} />
        <Switch>
          {
            routes(auth,setAuth).map(({allowed, path, children, redirectPath}, index) => 
              <ProtectedRoute key={`protecte-route-${index}`} allowed={allowed} path={path} redirectPath={redirectPath}>
                {children}
              </ProtectedRoute>
            )
          }
        </Switch>
      </Router>
    </div>
  )
}

export default App
