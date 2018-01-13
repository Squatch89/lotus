import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { getUserData } from "../Utils/userTrends";
import './User.css';

// creates User component to render to the page

class UserHome extends Component {
    
    state = {
        user: []
    };
    
    getUser() {
        getUserData().then((user) => {
            this.setState({ user });
        })
    }
    
    componentDidMount() {
        this.getUser();
    }
    
    render() {
        
        const { users } = this.state;
        
        return (
             users.map( (user, index) => {
                <div key={index}>
                    <h1>{user.username}</h1>
                </div>
            })
    
        
            
        //
        // <div className="jumbotron text-center">
        //     <h1>User</h1>
        //     <hr className="hr"/>
        //     <p>Tell us how you're feeling right now.</p>
        //     <p className="lead">
        //         <Link className="btn btn-primary btn-lg" to="/">Home</Link>
        //     </p>
        // </div>
       
        
        )
    }
}

// exports User for external use
export default UserHome;