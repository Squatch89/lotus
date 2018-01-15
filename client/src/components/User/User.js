import React from 'react';
import {Link} from 'react-router-dom';
import './User.css';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
// creates User component to render to the page
const User = () => {
    return (
        <div className="wrapper">
        <Header/>
        <div className="container">
            <div className="jumbotron text-center">
                <h1>User</h1>
                <hr className="hr"/>
                <p>Tell us how you're feeling right now.</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                </p>
            </div>
        </div>
        <Footer/>
        </div>
    )
};
// exports User for external use
export default User;