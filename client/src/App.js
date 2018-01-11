import React, { Component } from 'react';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import Header from './components/Header/Header.js';
import './App.css';

class App extends Component {
    
    state = {users: []};
    
    componentDidMount() {
        fetch('/home')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }
    
    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}


export default App;
