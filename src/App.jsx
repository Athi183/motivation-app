import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoodPage from './pages/MoodPage';
import LazyNudge from './pages/LazyNudge';
import MindfulMinute from './pages/MindfulMinute'; // ✅ New import

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/lazy" element={<LazyNudge />} />
        <Route path="/mindful" element={<MindfulMinute />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
