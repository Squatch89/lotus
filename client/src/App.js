import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import User from './components/User/User.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
import Trends from './components/Trends/Trends.js';
import Meditation from './components/Meditation/Meditation.js';
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

    // function to update authenticated state upon user login
    authenticateUser ()  {
        this.setState({
            authenticated: true
                      });
        console.log(this.state);
}

    render() {
        const authenticated = this.state.authenticated;

        return (

<div>
                <Route path="/" exact component={
                    Jumbotron
                }/>
                <Route path="/user" component={
                    authenticated ? User : Signin
                }/>
                <Route path="/signin" render={props => <Signin authenticateUser={this.authenticateUser.bind(this)} {...props}/>} />
                <Route path="/signup" component={Signup} />
                <Route path="/trends" component={
                    authenticated ? Trends : Signin
                }/>
                <Route path="/meditation" component={
                    authenticated ? Meditation : Signin
                }/>


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
