import React from 'react';
import { Link } from 'react-router-dom';
import './Jumbotron.css';
import logo from "../Images/logo.png";

// creates Jumbotron component to render to the  landing page
const Jumbotron = () => {
    return (

        <div className="container">
        <div className="jumbotron text-center">
            <img src={logo} alt="lotus logo" id="biglogo"/>
            <h1>Lotus Tracker</h1>
            <hr className="hr"/>
            <p>Track your mental health, and take a break through meditation.</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/signin">Sign In</Link>
            </p>
        </div>
        </div>
    )
};

// exports Jumbotron for external use
export default Jumbotron;
