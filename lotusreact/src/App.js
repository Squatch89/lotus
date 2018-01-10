import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import Header from './components/Header/Header.js';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="container">
                <Route path="/" exact component={Jumbotron} />
                <Route path="/user" component={Header} />
                <Route path="/trends" component={Header} />
                <Route path="/meditation" component={Header} />
            </div>
        );
    }
}

export default App;
