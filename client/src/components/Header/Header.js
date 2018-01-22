import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import logo from "../Images/logo.png";
import Wrapper from "../Wrapper/Wrapper.js";


// creates Header component to render to the page
class Header extends Component {

    // Signout function
    signOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('UN');
        this.props.history.push('/');
    };

    render() {
        return (

            <nav className="navbar">

                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="lotus logo" className="littlelogo"/>
                    <div className="brand-name">Lotus Tracker</div>
                </Link>
                <div className="navbar-nav">
                    <ul className="navbar-group">
                        <li className="navbar-item">
                            <button className="btn btn-primary" onClick={this.signOut}>Log Out</button>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/user">User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/trends">Trends</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/meditation">Meditation</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

};

// exports Header for external use
export default withRouter(Header);
