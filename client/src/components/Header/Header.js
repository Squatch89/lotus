import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../Images/logo.png";

// creates Header component to render to the page
const Header = () => {
    return (
        <nav className="navbar">

            <Link className="navbar-brand" to="/">
                <img src={logo} alt="lotus logo" className="littlelogo"/>
                <div className="brand-name">Lotus Tracker</div>
            </Link>
            <div className="navbar-nav">
                <ul className="navbar-group">
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/user">User</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/trends">Trends</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/meditation">Meditation</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/signin">Sign In</Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

// exports Header for external use
export default Header;
