import React, {Component} from 'react';
import Button from '../Button/Button.js';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
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
    
    chooseAudio = (id, filename) => {
        
        console.log("ID: ", id);
        const audioName = this.state.audioFiles;
        console.log("Audio Path: ", audioName[id]);
        this.setState({chosenAudio: audioName[id], meditationSelected: true});
    };
    
    
    startBreath = (id) => {
        if (id === "start") {
            this.setState({breathStart: true});
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
    
    componentDidUpdate() {
        if (this.state.meditationType === "Audio") {
            this.refs.audio.load();
        }
    }
    
    render() {
        if (this.state.meditationType === "Audio") {
            return (
                <Wrapper>
                    <Header/>
                    <Container>
                        <PresentAudio {...this.state} clickHandler={this.clickHandler}/>
                        
                        {this.state.meditationSelected ? <audio controls ref="audio" autoPlay loop>
                            
                            <source src={this.state.chosenAudio} type="audio/wav"/>
                            
                            not supported
                        
                        </audio> : ''}
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
                        <div className="jumbotron">
                            <h1>Meditation</h1>
                            <hr className="hr"/>
                            <BreathCircle {...this.state} clickStart={this.startBreath}
                                          clickHandler={this.clickHandler}/>
                        </div>
                    </Container>
                    <Footer/>
                </Wrapper>
            )
        }
    }
}

//tenerary operator to switch between medtype buttons and then the screens

const PresentAudio = (props) => {
    if (!props.meditationSelected) {
        return (
            <div>
                <div className="btn-space">
                    {
                        props.meditationChoices.map((med, index) => (
                            <Button
                                key={med}
                                id={index}
                                clickHandler={props.clickHandler}
                                name={med}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
    else if (props.meditationSelected && props.meditationType === "Audio") {
        return (
            <div className="jumbotron text-center">
                <h1>Meditation</h1>
                <hr className="hr"/>
                <p>Choose a relaxing soundscape.</p>
                <div className="btn-space">
                    {
                        props.audio.map((audio, index) => (
                            <Button
                                key={audio}
                                id={index}
                                clickHandler={props.clickHandler}
                                name={audio}
                            />
                        ))
                    }
                </div>
            </div>
        
        )
    }
};

const BreathCircle = (props) => {
    if (!props.meditationSelected) {
        return (
            <div>
                <div className="btn-space">
                    {
                        props.meditationChoices.map((med, index) => (
                            <Button
                                key={med}
                                id={index}
                                clickHandler={props.clickHandler}
                                name={med}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
    else if (props.meditationSelected && props.meditationType === "Breath") {
        return (
            <div className="circleContainer">
                {(!props.breathStart) ?
                    <div className="circleText">Breathe fully into your stomach
                        as
                        the circle
                        expands, and fully release as
                        the circle contracts
                        <div>
                            <button onClick={() => props.clickStart("start")} id="start"
                                    className="btn btn-primary btn-button">Start
                            </button>
                        </div>
                    </div>
                    :
                    < div className="circle"></div>
                }
            </div>
        )
    }
};

// exports Meditation for external use
export default Meditation;