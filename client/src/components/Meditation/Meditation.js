import React from 'react';
import {Link} from 'react-router-dom';
import './Meditation.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

// creates Meditation component to render to the page
const Meditation = () => {
    return (
        <div className="wrapper">
        <Header/>
        <div className="container">
            <div className="jumbotron text-center">
                <h1>Meditation</h1>
                <hr className="hr"/>
                <p>Relax your mind through meditation</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                </p>
            </div>
        </div>
        <Footer/>
        </div>
    )
};
// exports Meditation for external use
export default Meditation;