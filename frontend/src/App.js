import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Register</h1>

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
