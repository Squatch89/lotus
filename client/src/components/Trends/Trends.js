import React from 'react';
import {Link} from 'react-router-dom';
import './Trends.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

// creates Trends component to render to the page
const Trends = () => {
    return (
        <div className="wrapper">
        <Header/>
        <div className="container">
            <div className="jumbotron text-center">
                <h1>Trends</h1>
                <hr className="hr"/>
                <p>Track your mental health</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                </p>
            </div>
        </div>
        <Footer/>
        </div>
    )
};
// exports Trends for external use
export default Trends;