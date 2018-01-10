import React, {Component} from 'react';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import Header from './components/Header/Header.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Jumbotron/>
            </div>
        );
    }
}

export default App;
