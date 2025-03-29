import { useNavigate } from 'react-router-dom';
import { login } from '../firebase';
import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Call useNavigate here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const success = await login({ email, password });
    setMessage(success ? 'Login successful!' : 'Login failed. Please try again.');

    if (success) {
      navigate('/dashboard'); // Use navigate here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="left">
        <div className="header">
          <img className="logo" src="./logo.png" alt="Logo" />
        </div>
        <div className="content-container">
          <div className="welcome">
            <h2>Welcome back, User.</h2>
            <p>Welcome back, please enter your details.</p>
          </div>
          <div className="form">
            <h3>Email</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2023 CriticalView360 . All rights reserved.</p>
          </div>
        </footer>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Login;
