import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import User from './components/User/User.js';
import Trends from './components/Trends/Trends.js';
import Meditation from './components/Meditation/Meditation.js';
import Header from './components/Header/Header.js';
import './App.css';


class App extends Component {
    render() {
        return (
            <div>
                {/*Header rendered only on certain routes*/}
                <Route path="/user" component={Header} />
                <Route path="/trends" component={Header} />
                <Route path="/meditation" component={Header} />

                <div className="container">
                    <Route path="/" exact component={Jumbotron} />
                    <Route path="/user" component={User} />
                    <Route path="/trends" component={Trends} />
                    <Route path="/meditation" component={Meditation} />
                </div>
            </div>
        );
    }
}

export default App;
