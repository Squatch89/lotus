import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import logo from "../Images/logo.png";

// creates Header component to render to the page
class Header extends Component {

    // Signout function
    signOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('UN');
        this.props.history.push('/');
    };

    showLinks = (event) => {
        event.preventDefault();
    };

    render() {
        return (

            <nav className="navbar">

                <span className="navbar-brand">
                    <img src={logo} alt="lotus logo" className="littlelogo"/>
                    <div className="brand-name navbar-link">Lotus Tracker</div>
                </span>
                <div className="navbar-nav">
                    <i className="dropdown-icon navbar-link navbar-item" onClick={this.showLinks}>&#9776;</i>
                    <ul className="navbar-group">
                        <li className="navbar-item">
                            <button className="btn btn-primary " id="logoutBtn" onClick={this.signOut}>Log Out</button>
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
