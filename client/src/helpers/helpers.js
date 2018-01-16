import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
// import {connect} from 'react-redux';
import Signup from '../components/Signup/Signup.js';
import SignIn from '../components/Signin/Signin.js';
import Jumbotron from '../components/Jumbotron/Jumbotron.js';
import User from '../components/User/User.js';
import Trends from '../components/Trends/Trends.js';
import Meditation from '../components/Meditation/Meditation.js';

const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

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
            render={(props) => !isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{pathname: '/user'}}/>}
        />
    )
};

const routes = (props) => (
    <Router>
        <PublicRoute path="/" component={Jumbotron}/>
        <PublicRoute path="/signup" component={Signup}/>
        <PublicRoute path="/signin" component={SignIn}/>
        <PrivateRoute path="/trends" component={Trends}/>
        <PrivateRoute path="/user" component={User}/>
        <PrivateRoute path="/meditation" component={Meditation}/>
    </Router>
);

export default routes;