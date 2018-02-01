import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';


class Signup extends Component {

    constructor() {
        super();

        this.state = {};
    }

    getValues = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };


    sendData = (event) => {
        event.preventDefault();

        axios.post('/api/signup', this.state)
            .then((data) => {
                sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
                sessionStorage.setItem('UN', JSON.stringify(this.state.username));
                // this.props.history.push('/user');
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                this.setState({signinerror: true});
            });
    };

    render() {

        if (this.state.signinerror) {
            return (
                <Wrapper>
                    <Container>
                        <div className="jumbotron text-center">

                            <h1>Sign Up</h1>
                            <hr className="hr"/>
                            <p className="error">This username is already taken.</p>

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

                                <button className="btn btn-primary btn-button" onClick={this.sendData}>Sign Up</button>
                            </form>


                            <Link to='/signin'>
                                <button className="btn btn-primary btn-button">Go to Signin</button>
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

                            <h1>Sign Up</h1>
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

                                <button className="btn btn-primary btn-button" onClick={this.sendData}>Sign Up</button>
                            </form>


                            <Link to='/signin'>
                                <button className="btn btn-primary btn-button">Go to Sign in</button>
                            </Link>

                        </div>
                    </Container>
                </Wrapper>
            );
        }


    }

}

export default Signup;