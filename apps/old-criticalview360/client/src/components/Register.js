import { register } from '../firebase';
import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register({ email, password });
    setMessage(success ? 'Registration successful!' : 'Registration failed. Please try again.');
  };

  return (
    <div className="register-container">
      <div className="left">
        <div className="header">
          <img className="logo" src="./logo.png" alt="Logo" />
        </div>
        <div className="form">
          <h2>Welcome to CriticalView360</h2>
          <p>Please fill out the form below to create your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="username">Display Name:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your display name here..."
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email here..."
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password here..."
                required
              />
            </div>
            <button type="submit" className="register-button">Register</button>
            {message && <p className="error-message">{message}</p>}
          </form>
        </div>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2023 CriticalView360. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Register;
