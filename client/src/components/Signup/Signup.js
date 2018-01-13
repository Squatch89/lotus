import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


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

        axios.post('/signup', this.state)
            .then((data) => {
                console.log(data);
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                this.props.history.push('/user');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {

        return (
            <div>

                <form>
                    <input
                        type="text"
                        name="username"
                        onChange={this.getValues}/> <br/>


                    <input
                        type="password"
                        name="password"
                        onChange={this.getValues}/> <br/>

                    <button onClick={this.sendData}>Sign Up</button>
                </form>


                <Link to = '/signin'> <button>Go to Signin</button> </Link>

            </div>
        );
    }

}

export default Signup;