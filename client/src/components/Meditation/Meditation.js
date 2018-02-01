import React, {Component} from 'react';
import Button from '../Button/Button.js';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import {Link} from "react-router-dom";
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Meditation.css';
import ForestOne from './Audio/Forest-1.wav';
import ForestTwo from './Audio/Forest-2.wav';
import OceanWaves from './Audio/Ocean-1.wav';


const Presentaudio = (props, clickHandler) => {
    return (
        <div className="jumbotron text-center">
            <h1>Soundscapes</h1>
            <hr className="hr"/>
            <p>Choose a relaxing soundscape.</p>
            <div className="btn-space">
                {
                    props.audio.map((audio, index) => (

                        <Button
                            key={audio}
                            id={index}
                            clickHandler={() => clickHandler(index, audio)}
                            name={audio}
                        />
                    ))
                }
            </div>
        </div>

    )
};


const Meditationlanding = (props, clickHandler) => (
    <div className="jumbotron">
        <h1>Meditation</h1>
        <hr className="hr"/>
        <div className="btn-space">
            <Link to="/meditation/breathcircle">
                <button className="btn btn-primary btn-lg btn-button">Breath</button>
            </Link>
            <Link to="/meditation/presentaudio">
                <button className="btn btn-primary btn-lg btn-button">Audio</button>
            </Link>
        </div>
    </div>
);

const Breathcircle = (props, clickHandler, startBreath) => {

    return (
        <div className="jumbotron">
            <h1>Guided Breathing</h1>
            <hr className="hr"/>
            <div className="circleContainer">
                {(!props.breathStart) ?
                    <div className="circleText">Breathe fully into your stomach
                        as
                        the circle
                        expands, and fully release as
                        the circle contracts
                        <div>
                            <button onClick={() => startBreath("start")} id="start"
                                    className="btn btn-primary btn-button">Start
                            </button>
                        </div>
                    </div>
                    :
                    < div className="circle"></div>
                }
            </div>
        </div>
    )
};

// creates Meditation component to render to the page
class Meditation extends Component {

    constructor() {
        super();
        this.state = {
            meditationChoices: ["Breath", "Audio"],
            meditationType: '',
            meditationSelected: true,
            audio: ["Day Time Forest", "Night Time Forest", "Ocean Waves"],
            audioFiles: [ForestOne, ForestTwo, OceanWaves],
            chosenAudio: '',
            breathStart: true
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

        // else if (this.state.meditationSelected && this.state.meditationType === "Audio") {
            this.chooseAudio(id, name);
        // }

        // else {
        //     console.log("hmmm that didn't work");
        // }
    };

    componentDidUpdate() {
        console.log("Hello World!!");
        if (this.state.meditationType === "Audio") {
            this.refs.audio.load();
        }
    }

    render() {

        const {match: {params: {test}}} = this.props;

        const upper_name = test.slice(0, 1).toUpperCase();
        const rest_name = test.slice(1).toLowerCase();
        const full_name = upper_name + rest_name;

        const sub_components = {
            Presentaudio,
            Breathcircle,
            Meditationlanding
        };


        return (
            <Wrapper>
                <Header/>
                <Container>


                    {sub_components[full_name]({...this.state}, this.clickHandler, this.startBreath, this.chooseAudio)}
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}


// if statement to switch between medtype buttons and then the screens


// exports Meditation for external use
export default Meditation;