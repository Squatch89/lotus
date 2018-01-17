import React, {Component} from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './Signin.css';


class Signin extends Component {

    constructor() {
        super();

        this.state = {};
    }

    getValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    sendData = (event) => {
        event.preventDefault();

        axios.post('/api/signin', this.state)
            .then((data) => {
                sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
                sessionStorage.setItem('UN', JSON.stringify(this.state.username));
            }).then((data) => {
                this.props.history.push('/user');

        })
            .catch((err) => {
                // Not signed
                console.log("Error Happened");
                console.log(err);
                this.setState({loginerror: true});
            });
    };
    
    signOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('UN');
        this.props.history.push('/');
    };

    render() {

        return (
            <div className="jumbotron text-center">

                <form>
                    <input
                        type="text"
                        name="username"
                        className="input"
                        placeholder="username"
                        onChange={this.getValues}/> <br/>


                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="password"
                        onChange={this.getValues}/> <br/>

                    <button className="btn btn-primary" onClick={this.sendData}>Sign In</button>
                    <button className="btn btn-primary" onClick={this.signOut}>Sign Out</button>
                </form>

                <Link to = '/signup'> <button className="btn btn-primary">Go to Sign up</button> </Link>

            </div>
        );
    }

}

export default withRouter(Signin);