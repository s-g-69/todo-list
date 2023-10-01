import React, { useState , history } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Signup from './MyComponents/Signup';
import Login from './MyComponents/Login';
import ProtectedRoute from './MyComponents/ProtectedRoute';
import TodoList from './MyComponents/TodoList';
// import './App.css';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleSignup = (username) => {
    setAuthenticated(true);
    setCurrentUser(username);
    history.push("/protected");
  };
  
  const handleLogin = (username) => {
    setAuthenticated(true);
    setCurrentUser(username);
    history.push("/protected");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setCurrentUser('');
  };

  return (
    <Router>
      <div className="App">
        <h1>Todo List App</h1>
        {authenticated ? (
          <div>
            <p>Welcome, {currentUser}!</p>
            <button onClick={handleLogout}>Log Out</button>
            <Link to="/TodoList">TodoList</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> 
          </div>
        )}
      </div>

      <Switch>
        <ProtectedRoute
          path="/protected"
          component={() => <TodoList currentUser={currentUser} />}
          isAuthenticated={authenticated}
        />

        <Route
          path="/login"
          render={(props) =>
            authenticated ? (
              <Redirect to="/protected" />
            ) : (
              <Login onLogin={handleLogin} {...props} />
            )
          }
        />

        <Route
          path="/signup"
          render={(props) =>
            authenticated ? (
              <Redirect to="/protected" />
            ) : (
              <Signup onSignup={handleSignup} {...props} />
            )
          }
        />

        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
