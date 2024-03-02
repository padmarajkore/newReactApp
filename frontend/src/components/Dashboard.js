// Dashboard.js

import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Analytics from './Analytics'; // Import Analytics component
import Settings from './Settings'; // Import Settings componen
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const [selectedOption, setSelectedOption] = useState('board'); // Default selected option is 'board'
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
  
    // Redirect to the login page (assuming you have access to history)
    // history.push('/login');
    // or you can use window.location.href to force a full page reload
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user-specific data using the token
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login if the user is not authenticated
          navigate('/login');
        } else {
      // Fetch user-specific data using the token
      // Make a request to your backend with the token
      // fetch('http://localhost:5000/user-data', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
      //   },
      // })
      //   .then(response => response.json())
      //   .then(data => setUserData(data))
      //   .catch(error => console.error('Error fetching user data:', error));
      // .then(response => response.json())
      // .then(data => setUserData(data))
      // .catch(error => console.error('Error fetching user data:', error));

      // For now, let's assume userData is fetched successfully
      setUserData({ /* user data */ });
      // Fetch user-specific data using the token
      // const response = await fetch('http://localhost:5000/user-data', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      //   },
      // });
      if (response.ok) {
        const data = await response.json();
        setUserData(userData); // Set the user data in state
        setCurrentDate(formattedDate);
        // setUserName(userData.name); // Make sure to include the 'name' property if it's returned from the backend

      } else {
        console.error('Error fetching user data:', response.status);
        navigate('/login');
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

fetchData();

// Format the current date in the desired format
const formattedDate = new Date().toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

// Set the formatted date in the state
setCurrentDate(formattedDate);
}, [navigate]);

  if (!userData) {
    // Render a loading state or redirect to login
    return <div>Loading...</div>;
  }

  const today = new Date().toLocaleDateString();
  
  return (
    <div className="dashboard-container">
    {/* Sidebar */}
    <div className="sidebar">
      <div className="logo">Pro Manage</div>
      {/* Board Option */}
      <div
        className={`sidebar-option ${selectedOption === 'board' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('board')}
      >
        <span className="icon">📋</span>
        <span className="option-text">Board</span>
      </div>
      {/* Analytics Option */}
      <div
        className={`sidebar-option ${selectedOption === 'analytics' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('analytics')}
      >
        <span className="icon">📊</span>
        <span className="option-text">Analytics</span>
      </div>
      {/* Settings Option */}
      <div
        className={`sidebar-option ${selectedOption === 'settings' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('settings')}
      >
        <span className="icon">⚙️</span>
        <span className="option-text">Settings</span>
      </div>
      <div className="logout-option" onClick={handleLogout}>
        <span className="icon">🚪</span>
        <span className="option-text">Log out</span>
      </div>
    </div>

      {/* /* Main Content */}
      <div className="main-content">
        <div className="welcome">
          Welcome, {userEmail}!
        </div>
        <div className="date">
        {currentDate}
        </div>
        <div className="title">
        <span className="title-text">{selectedOption === 'board' ? 'Board' : ''}</span>
          {selectedOption === 'board' && (
            <div className="filter">
              <select className="filter-select">
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
            </div>
          )}
        </div>
        <div className="board-content">
        {selectedOption === 'board' && (
            <>
              {/* Your board content goes here */}
              {/* Example: Four rectangular blocks */}
              <div className="board-block">
            <div className="block-title">Backlog</div>
          </div>
          <div className="board-block">
            <div className="block-title">To Do</div>
          </div>
          <div className="board-block">
            <div className="block-title">In Progress</div>
          </div>
          <div className="board-block">
            <div className="block-title">Done</div>
          </div>
        </>
          )}
          {selectedOption === 'analytics' && <Analytics />} {/* Render Analytics component */}
          {selectedOption === 'settings' && <Settings />} {/* Render Settings component */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
