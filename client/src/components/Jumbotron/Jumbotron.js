import React from 'react';
import './Jumbotron.css';
import logo from "../Images/logo.png";

// creates Jumbotron component to render to the  landing page
const Jumbotron = () => {
    return (

        <div className="jumbotron text-center">
            <img src={logo} alt="lotus logo" id="biglogo"/>
            <h1 className="display-3">Lotus Tracker</h1>
            <hr className="my-4"/>
            <p>Track your mental health, and take a break through meditation.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Sign In</a>
            </p>
        </div>
    )
};

// exports Jumbotron for external use
export default Jumbotron;
