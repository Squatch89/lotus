import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import {Link} from "react-router-dom";
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Meditation.css';
import ForestOne from './Audio/Forest-1.wav';
import ForestTwo from './Audio/Forest-2.wav';
import OceanWaves from './Audio/Ocean-1.wav';



// creates Meditation component to render to the page
class Meditation extends Component {
    
    constructor() {
        super();
        this.state = {
            meditationChoices: ["Breath", "Audio"],
            meditationType: '',
            meditationSelected: false,
            audio: ["Day Time Forest", "Night Time Forest", "Ocean Waves"],
            audioFiles: [ForestOne, ForestTwo, OceanWaves],
            chosenAudio: '',
            breathStart: false
        };
    }
    
    chooseMedType = (id, name) => {
        console.log("ID: ", id);
        const medType = this.state.meditationChoices[id];
        console.log("MedType: ", medType);
        this.setState({meditationType: medType, meditationSelected: true});
    };
    
  
    
    
    resetBreath = () => {
        console.log("whelp");
        if (this.state.breathStart) {
            this.setState({breathStart: false});
        }
    };
    
    clickHandler = (id, name) => {
        console.log("ID: ", id);
        console.log("Name: ", name);
        
        if (!this.state.meditationSelected) {
            this.chooseMedType(id, name);
        }
        
        else if (this.state.meditationSelected && this.state.meditationType === "Audio") {
            this.chooseAudio(id, name);
        }
        
        else {
            console.log("hmmm that didn't work");
        }
    };
    
    
    
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


// if statement to switch between medtype buttons and then the screens


// exports Meditation for external use
export default Meditation;