import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Redirect } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import JoinRoom from './JoinRoom';
import Room from './Room';

const HomePage = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/join" Component={JoinRoom} />
                <Route path="/create" Component={CreateRoomPage} />
                <Route path="/room/:roomCode" Component={Room} />
            </Routes>
        </Router>

    );
}

export default HomePage;