import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

// creates Signup component to render to the page
const Signup = () => {
    return (
        <div className="jumbotron text-center">
            <h1>Sign Up</h1>
            <hr className="hr"/>
            <p>Create a new user account to track your mental health.</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/">Home</Link>
            </p>
        </div>
    )
};

// exports Signup for external use
export default Signup;
