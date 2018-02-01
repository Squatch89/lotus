import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './User.css';
import axios from 'axios';
import moment from "moment";

// creates User component to render to the page
class User extends Component {

    // stores user mood data
    constructor() {
        super();
        this.state = {
            username: JSON.parse(sessionStorage.getItem('UN')),
            moodLogged: false,
            firstLoad: false
        };
    }

    // sends user mood data
    sendToDB = (mood, username) => {
        
        const currentMoodDate = new Date();
        const date = moment(currentMoodDate);
        const day = date.date();
        const month = date.month();
        const year = date.year();
        
        axios.post('/api/daily/mood', {username, year, month, day, mood})
            .then((data) => {
                console.log(data);
                this.setState({moodLogged: data.data});
            })
            .catch((err) => {
                console.log("There was an error.");
                console.log(err);
            })
    };

    // sets mood and sends to DB function
    checkIn = (id) => {
        const mood = id.target.id;
        
        this.sendToDB(mood, this.state.username);
    };

    // checks if a mood was logged today
    checkIfMoodLogged = (username) => {
        
        const currentMoodDate = new Date();
        const date = moment(currentMoodDate);
        const day = date.date();
        const month = date.month();
        const year = date.year();
        
        axios.post('/api/mood', {username, year, month, day})
            .then((data) => {
                this.setState({moodLogged: data.data, firstLoad: true});
            })
            .catch((err) => {
                console.log("There was an error.");
                console.log(err);
            })
    };
    
    componentDidMount() {
        this.checkIfMoodLogged(this.state.username);
    }
    
    render() {
        
        if (!this.state.moodLogged && !this.state.firstLoad) {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
        else if (!this.state.moodLogged && this.state.firstLoad) {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                        <div className="jumbotron text-center">
                            <h1>User</h1>
                            <hr className="hr"/>
                            <p>Tell us how you're feeling right now.</p>
                            <p className="lead">
                                <i id="good" onClick={this.checkIn} className="fa fa-smile-o fa-5x moodbtn"
                                   aria-hidden="true"/>
                                <i id="neutral" onClick={this.checkIn} className="fa fa-meh-o fa-5x moodbtn"
                                   aria-hidden="true"/>
                                <i id="bad" onClick={this.checkIn} className="fa fa-frown-o fa-5x moodbtn"
                                   aria-hidden="true"/>
                            </p>
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
                        <div className="jumbotron text-center">
                            <MedOrTrend {...this.state}/>
                        </div>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
    }
}

// second user page
const MedOrTrend = (props) => {
    if (props.moodLogged) {
        return (
            <div className="medOrTrend">
                <div className="choice-txt">What would you like to do next?</div>
                <div className="btn-choices">
                    <Link to="/trends">
                        <button className="btn btn-primary btn-lg btn-button">Check Trends</button>
                    </Link>
                    <Link to="/meditation">
                        <button className="btn btn-primary btn-lg btn-button">Do Some Meditation</button>
                    </Link>
                </div>
            </div>
        )
    }
};

// exports User for external use
export default User;