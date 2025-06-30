import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginUserPage } from './pages/LoginUserPage';
import { RegisterUserPage } from './pages/RegisterUserPage';

function App() {
  return (
    <Router>
      <div>
        <h1>ForBuddy</h1>
        <p>Welcome to ForBuddy, your go-to platform for seamless user registration and authentication</p>
        <Routes>
          <Route path="/" element={<RegisterUserPage />} />
          <Route path="/login" element={<LoginUserPage />} />
          <Route path="/" element={<p>Home Page</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
