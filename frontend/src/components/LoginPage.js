// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import Dashboard from './Dashboard';
import './Dashboard.css'; // Import Dashboard styles
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // You can use a more advanced state management solution
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = async (endpoint) => {
    try {
      // Check if email and password are not empty
      if (!email || !password) {
        alert('Email and password are required');
        return;
      }

      // Construct the endpoint based on the button clicked
      const authEndpoint = endpoint || '/login';

      const response = await fetch(`https://backend1-5mgwfmoyp-padamarajs-projects.vercel.app{authEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${data.token}`, // Include the token here
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('Login request payload:', { email, password });

      const data = await response.json();
      console.log('Response data:', data); // Log the data

      if (response.ok) {
        console.log(`${authEndpoint.charAt(1).toUpperCase() + authEndpoint.slice(2)} successful:`, data.message);
        // Optionally, you can close the modal or redirect
        setError('');

        // Set the token in local storage
        // localStorage.setItem('token', data.token);
      if (data.token) {
        // Set the token in local storage
        localStorage.setItem('token', data.token);
    

      // Redirect to the Dashboard
      setLoggedIn(true);
      const { email } = data; // Extract username from token data
      localStorage.setItem('username', email);
      navigate('/dashboard');
      } else {
        console.error(`${authEndpoint.charAt(1).toUpperCase() + authEndpoint.slice(2)} failed:`, data.error || 'Internal server error');
        // Handle error on the frontend

        // Additional logging for potential validation errors
        if (data.errors) {
          console.error('Validation errors:', data.errors);
          setError('Validation errors occurred');
        } else {
          setError(data.error || 'Internal server error');
        }
      }
    }
    } catch (error) {
      console.error(`Error during authentication:`, error);
      setError('Network or server error occurred');
      // Handle network or other errors
    }
  };

  const handleRegisterRedirect = () => {
    // Redirect to the registration page
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="sky-blue-section">
        <img src="astronaut-image.jpg" alt="Astronaut" />
        <p>Just a couple of clicks and we start.</p>
      </div>
      <div className="login-content">
        <h1>Login</h1>
        <div className="input-group">
          <div></div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="📧 Email"
          />
        </div>
        <div className="input-group">
          <div></div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="🔒 Password"
          />
          <div className="toggle-password" onClick={handleTogglePassword}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </div>
        </div>
        <button className="login-button" onClick={() => handleAuth('/login')}>Login</button>
         <div className="register-section">
          <p>Have no account yet?</p>
          <button className="register-button" onClick={handleRegisterRedirect}>Register</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;