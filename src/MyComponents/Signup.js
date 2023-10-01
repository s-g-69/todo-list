import React, { useState } from 'react';

const Signup = ({ onSignup, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (username && password) {
      onSignup(username);
      history.push('/protected');
    } else {
      setError('Both username and password are required.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
