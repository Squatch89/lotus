import React from 'react';
import { Link } from 'react-router-dom';
import './Trends.css';
// creates Trends component to render to the page
const Trends = () => {
    return (
        <div className="jumbotron text-center">
            <h1>Trends</h1>
            <hr className="hr"/>
            <p>Track your mental health</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/">Home</Link>
            </p>
        </div>
    )
};
// exports Trends for external use
export default Trends;