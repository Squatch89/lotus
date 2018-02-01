import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './Signin.css';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';


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
                this.setState({loginerror: false});
                window.location.reload();
            })
            .catch((err) => {
                // Not signed in
                console.log("Error Happened");
                console.log(err);
                this.setState({loginerror: true});
            });
    };

    render() {

        if (this.state.redirect) {
            return (<Redirect to={{pathname: '/user'}} />);
        }

        if (this.state.loginerror) {
            return (
                <Wrapper>
                    <Container>
                        <div className="jumbotron text-center">

                            <h1>Sign In</h1>
                            <hr className="hr"/>
                            <p className="error">Incorrect username or password.</p>

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

                                <button className="btn btn-primary btn-button" onClick={this.sendData}>Sign In</button>

                            </form>

                            <Link to='/signup'>
                                <button className="btn btn-primary btn-button">Go to Sign up</button>
                            </Link>

                        </div>
                    </Container>
                </Wrapper>
            );
        } else {
            return (
                <Wrapper>
                    <Container>
                        <div className="jumbotron text-center">

                            <h1>Sign In</h1>
                            <hr className="hr"/>
                            <br/>

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

                                <button className="btn btn-primary btn-button" onClick={this.sendData}>Sign In</button>

                            </form>

                            <Link to='/signup'>
                                <button className="btn btn-primary btn-button">Go to Sign up</button>
                            </Link>

                        </div>
                    </Container>
                </Wrapper>
            );
        }


    }

}

export default Signin;