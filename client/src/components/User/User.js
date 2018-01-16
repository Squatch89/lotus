import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './User.css';

// creates User component to render to the page
class User extends Component {
    
    constructor() {
        super();
        this.state = {
            checkedIn: false
        };
    }
    
    sendToDB = () => {
    //this needs to send data to the db connected with the logged in user
        //it should probably return something letting us know that it was successful
        
        //will limit to one check in per day on DB side of things
        //should update user if they come back to user page that they have already checked in
    };
    
    
    checkIn = (id) => {
        console.log("ID: ", id.target.id);
        this.setState({checkedIn: true});
        
        //function to send data to the db of the logged in user
        // sendToDB(id.target.id);
    };
    
    render() {
        if (!this.state.checkedIn) {
            return (
                <div>
                    <div className="jumbotron text-center">
                        <h1>User</h1>
                        <hr className="hr"/>
                        <p>Tell us how you're feeling right now.</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                        </p>
                    </div>
                    <div>How has your day been</div>
                    <i id="good" onClick={this.checkIn} className="fa fa-smile-o fa-5x" aria-hidden="true"/>
                    <i id="neutral" onClick={this.checkIn} className="fa fa-meh-o fa-5x" aria-hidden="true"/>
                    <i id="bad" onClick={this.checkIn} className="fa fa-frown-o fa-5x" aria-hidden="true"/>
                </div>
            )
        }
        else {
            return (
                <MedOrTrend {...this.state}/>
            )
        }
    }
}

const MedOrTrend = (props) => {
    if (props.checkedIn) {
        return (
            <div>
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