import React from 'react'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CvModule from './pages/CVmodulePages/CVModule';
import FirstTimePg1 from './pages/FirstTimePages/FirstTimePg1';
import FirstTimePg2 from './pages/FirstTimePages/FirstTimePg2';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Journal from './pages/Journal'
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div data-theme="lemonade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CvModule" element={<CvModule />} />
        <Route path="/Welcome" element={<FirstTimePg1 />} />
        <Route path="/Getting Started" element={<FirstTimePg2 />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Journal" element={<Journal />} />
      </Routes>
    </div>
  )
}

export default App;
