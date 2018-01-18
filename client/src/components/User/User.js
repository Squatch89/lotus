import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './User.css';
import axios from 'axios';

// creates User component to render to the page
class User extends Component {
    
    constructor() {
        super();
        this.state = {
            checkedIn: false,
            username:  JSON.parse(sessionStorage.getItem('UN'))
        };
    }
    
    sendToDB = (mood, username) => {
        
        axios.post('/api/mood', {username, mood})
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log("There was an error.");
                console.log(err);
            })
        //this needs to send data to the db connected with the logged in user
        //it should probably return something letting us know that it was successful
        
        //will limit to one check in per day on DB side of things
        //should update user if they come back to user page that they have already checked in
    };
    
    checkIn = (id) => {
        const mood = id.target.id;
        console.log(this.state.username);
        console.log("ID:",mood);
        this.setState({checkedIn: true});
        
        this.sendToDB(mood, this.state.username);
        //function to send data to the db of the logged in user
        // sendToDB(id.target.id);
    };
    
    render() {
        if (!this.state.checkedIn) {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                        <div>
                            <div className="jumbotron text-center">
                                <h1>User</h1>
                                <hr className="hr"/>
                                <p>Tell us how you're feeling right now.</p>
                                <p className="lead">
                                    <i id="good" onClick={this.checkIn} className="fa fa-smile-o fa-5x moodbtn" aria-hidden="true"/>
                                    <i id="neutral" onClick={this.checkIn} className="fa fa-meh-o fa-5x moodbtn" aria-hidden="true"/>
                                    <i id="bad" onClick={this.checkIn} className="fa fa-frown-o fa-5x moodbtn" aria-hidden="true"/>
                                </p>
                            </div>

                        </div>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
        else {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                        <MedOrTrend {...this.state}/>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
    }
}

const MedOrTrend = (props) => {
    if (props.checkedIn) {
        return (
            <div className="container">
                <Link to="/trends">
                    <button className="btn btn-primary btn-lg">Check Your Trends</button>
                </Link>
                <span>What would you like to do next</span>
                <Link to="/meditation">
                    <button className="btn btn-primary btn-lg">Do Some Meditation</button>
                </Link>
            </div>
        )
    }
};

// exports User for external use
export default User;