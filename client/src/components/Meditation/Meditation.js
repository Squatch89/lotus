import React from 'react';
import { Link } from 'react-router-dom';
import './Meditation.css';
// creates Meditation component to render to the page
const Meditation = () => {
    return (
        <div className="jumbotron text-center">
            <h1>Meditation</h1>
            <hr className="hr"/>
            <p>Relax your mind through meditation</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/">Home</Link>
            </p>
        </div>
    )
};
// exports Meditation for external use
export default Meditation;