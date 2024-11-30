import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import OrganizerDashboard from './components/OrganizerDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
