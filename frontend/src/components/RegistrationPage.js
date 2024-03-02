// RegistrationPage.js
import React, { useState } from 'react';
import './RegistrationPage.css'; // Import RegistrationPage styles
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async () => {
    try {
      // Check if fields are not empty
      if (!name || !email || !password || !confirmPassword) {
        alert('All fields are required');
        return;
      }

      // Check if password and confirm password match
      if (password !== confirmPassword) {
        alert('Password and Confirm Password must match');
        return;
      }

      const response = await fetch('https://backend1-5mgwfmoyp-padamarajs-projects.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      console.log('Login request payload:', { name,email, password });

      const data = await response.json();
      console.log('Response data:', data); // Log the data

      if (response.ok) {
        console.log('Registration successful:', data.message);
        setError('');

        // Optionally, you can close the modal or redirect
        navigate('/login');
      } else {
        console.error('Registration failed:', data.error || 'Internal server error');
        setError(data.error || 'Internal server error');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Network or server error occurred');
    }
  };

  return (
    <div className="registration-container">
      <div className="sky-blue-section">
      <img src="astronaut-image.jpg" alt="Astronaut" />
        <p>Just a couple of clicks and we start.</p>
      </div>
      <div className="registration-content">
        <h1>Register</h1>
        <div className="input-group">
          <div></div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="👤 Name"
          />
        </div>
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
        <div className="input-group">
          <div></div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="🔒 Confirm Password"
          />
          <div className="toggle-password" onClick={handleTogglePassword}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </div>
        </div>
        <button className="register-button" onClick={handleRegistration}>Register</button>
        <div className="login-section">
          <p>Already have an account?</p>
        </div>
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default RegistrationPage;
