import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import {Link} from "react-router-dom";
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Meditation.css';

// creates Meditation component to render to the page
class Meditation extends Component {
    
    render() {
        
        return (
            <Wrapper>
                <Header/>
                <Container>
                    <div className="jumbotron">
                        <h1>Meditation</h1>
                        <hr className="hr"/>
                        <div className="btn-space">
                            <Link to="/breath">
                                <button id="Breath" className="btn btn-primary btn-lg btn-button">Breath</button>
                            </Link>
                            <Link to="/soundscape">
                                <button id="Audio" className="btn btn-primary btn-lg btn-button">Audio</button>
                            </Link>
                        </div>
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}


// exports Meditation for external use
export default Meditation;