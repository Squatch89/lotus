import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import User from './components/User/User.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
import Trends from './components/Trends/Trends.js';
import Meditation from './components/Meditation/Meditation.js';
import Breath from './components/Breath/Breath.js';
import Soundscape from './components/Soundscape/Soundscape.js';
import Nopage from './components/Nopage/Nopage.js';
import './App.css';

const isAuthenticated = JSON.parse(sessionStorage.getItem('isAuthenticated'));

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) => (isAuthenticated)
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
            render={(props) => (!isAuthenticated) ? <Component {...props} /> : <Redirect to={{pathname: '/user'}} /> }
        />
    )
};

const App = (props) => (
    <Router>
        <Switch>
    <div className="routerDiv">
        <PublicRoute path="/" component={Landing}/>
        <PublicRoute path="/signup" component={Signup}/>
        <PublicRoute path="/signin" component={Signin}/>
        <PrivateRoute path="/trends" component={Trends}/>
        <PrivateRoute path="/user" component={User}/>
        <PrivateRoute exact path="/meditation" component={Meditation}/>
        <PrivateRoute path="/breath" component={Breath}/>
        <PrivateRoute path="/soundscape" component={Soundscape}/>
        <Route component={Nopage}/>
    </div>
        </Switch>
    </Router>
);

export default App;
