import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <h1>My homework Todo App</h1>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/">

          </Route>
          <Route path="/register">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
