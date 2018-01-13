import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import User from './components/User/User.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
import Trends from './components/Trends/Trends.js';
import Meditation from './components/Meditation/Meditation.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import './App.css';


class App extends Component {
    
    // state = {users: []};
    //
    // componentDidMount() {
    //     fetch('/home')
    //         .then(res => res.json())
    //         .then(users => this.setState({ users }));
    // }
    constructor() {
        super();
        this.state = {
            authenticated: false
        }
    }

    render() {
        return (
            <div className="wrapper">
                {/*Header rendered only on certain routes*/}

                {["/user", "/trends", "/meditation"].map(path =>
                    <Route path={path} component={Header} />
                )}

                <div className="container">
                    <Route path="/" exact component={Jumbotron} />
                    <Route path="/user" component={User} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/trends" component={Trends} />
                    <Route path="/meditation" component={Meditation} />
                </div>

                {/*Footer rendered only on certain routes*/}
                {["/user", "/trends", "/meditation"].map(path =>
                    <Route path={path} component={Footer} />
                )}
    
                
                
                {/*<div className="App">*/}
                {/*<h1>Users</h1>*/}
                {/*{this.state.users.map(user =>*/}
                    {/*<div key={user.id}>{user.username}</div>*/}
                {/*)}*/}
                {/*</div>*/}
               
            
            </div>
            
            
        );
    }
}

export default App;
