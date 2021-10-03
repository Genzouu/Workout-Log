import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link className="menu-link" to="/">Menu</Link>
            <Link className="menu-link" to="/log">Log</Link>
            <Link className="menu-link" to="/statistics">Statistics</Link>
            <Link className="menu-link" to="/settings">Settings</Link>
        </nav>
    );
}

export default Navbar;