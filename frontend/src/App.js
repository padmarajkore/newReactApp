// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import LoginPage from './components/LoginPage';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Dashboard username={username} />} /> */}
//         {/* No need for the separate /dashboard route now */}
//         <Route path='/login' element={<LoginPage />}></Route>
//         <Route path='/dashboard' element={<Dashboard />}></Route>
//       </Routes>
//     </BrowserRouter>
//     );
// }
// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RegistrationPage from './components/RegistrationPage';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const username = localStorage.getItem('username');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Dashboard username={username} />} />
        {/* No need for the separate /dashboard route now */}
         <Route path='/' element={<LoginPage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/register' element={<RegistrationPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
