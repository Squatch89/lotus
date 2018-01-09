// imports React and its components
import React from 'react';
import './Jumbotron.css';
import logo from "../Images/logo.png";

// creates Grid component to render to the page
const Jumbotron = () => {
    return (
        // creates a 'tile' with a click event that triggers the scoreUpdate function (from App.js)

        <div className="container">
            <div className="jumbotron text-center">
                <img src={logo} alt="lotus logo" id="logo" />
                    <h1 className="display-3">Lotus Tracker</h1>
                    <hr className="my-4" />
                        <p>Track your mental health, and take a break through meditation.</p>
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#" role="button">Sign In</a>
                        </p>
            </div>
        </div>
)
};

// exports Grid for external use
export default Jumbotron;
