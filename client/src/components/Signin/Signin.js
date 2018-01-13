import React from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';

// creates Signin component to render to the page
const Signin = () => {
    return (
        <div className="jumbotron text-center">
            <h1>Sign In</h1>
            <hr className="hr"/>
            <p>Sign into an existing user account.</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/">Home</Link>
            </p>
        </div>
    )
};

// exports Signin for external use
export default Signin;
