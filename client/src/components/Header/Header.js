import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import logo from "../Images/logo.png";

// creates Header component to render to the page
class Header extends Component {

    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    // Signout function
    signOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('UN');
        // this.props.history.push('/');
        window.location.reload();
    };

    showLinks = (event) => {
        event.preventDefault();
        if (!this.state.show) {
            this.setState({show: true});
        } else {
            this.setState({show: false});
        }
    };

    render() {
        return (

            <nav className="navbar">

                <span className="navbar-brand">
                    <img src={logo} alt="lotus logo" className="littlelogo"/>
                    <div className="brand-name navbar-link">Lotus Tracker</div>
                </span>
                <div className="navbar-nav">
                    <div className="dropdown-icon navbar-link" onClick={this.showLinks}>&#9776;
                        <div className="dropdown-content" style={{display: (this.state.show) ? 'inline-block' : 'none'}}>
                            <Link to="/user" className="navbar-link navbar-item dropdown-item">User</Link>
                            <Link to="/trends" className="navbar-link navbar-item dropdown-item">Trends</Link>
                            <Link to="/meditation" className="navbar-link navbar-item dropdown-item">Meditation</Link>
                            <button className="btn btn-primary " id="logoutBtn" onClick={this.signOut}>Log Out</button>
                        </div>
                    </div>


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
