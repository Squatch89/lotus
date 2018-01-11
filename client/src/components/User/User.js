import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';
// creates User component to render to the page
const User = () => {
    return (
        <div className="jumbotron text-center">
            <h1>User</h1>
            <hr className="hr"/>
            <p>Tell us how you're feeling right now.</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/">Home</Link>
            </p>
        </div>
    )
};
// exports User for external use
export default User;