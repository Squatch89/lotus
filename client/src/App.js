import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import User from './components/User/User.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
import Trends from './components/Trends/Trends.js';
import Meditation from './components/Meditation/Meditation.js';
import './App.css';

const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/signin'}}/>}
        />
    )
};

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) =>  <Component {...props} />}
        />
    )
};

const App = (props) => (
    <Router>
    <div>
        <PublicRoute path="/" component={Jumbotron}/>
        <PublicRoute path="/signup" component={Signup}/>
        <PublicRoute path="/signin" component={Signin}/>
        <PrivateRoute path="/trends" component={Trends}/>
        <PrivateRoute path="/user" component={User}/>
        <PrivateRoute path="/meditation" component={Meditation}/>
    </div>
    </Router>
);

export default App;
