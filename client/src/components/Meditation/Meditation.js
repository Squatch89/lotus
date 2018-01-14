import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.js';
import Audio from "../Audio/Audio.js";
import './Meditation.css';
import ForestOne from './Audio/Forest-1.wav';
import ForestTwo from './Audio/Forest-2.wav';
import OceanWaves from './Audio/Ocean-1.wav';
import WhiteNoise from './Audio/White-Noise.wav';
import PinkNoise from './Audio/Pink-Noise.wav';
// creates Meditation component to render to the page
class Meditation extends Component {
    constructor() {
        super();
        this.state = {
            meditationType: ["Breath", "Audio"],
            meditationSelected: false,
            audio: ["Day Time Forest", "Night Time Forest", "Ocean Waves", "White Noise", "Pink Noise"],
            audioFiles: [ForestOne, ForestTwo, OceanWaves, WhiteNoise, PinkNoise],
            chosenAudio:''
        };
    }
    chooseAudio = (id, fileName) => {
        console.log("ID: ", id);
        const audioName = this.state.audioFiles;
        console.log("Audio Path: ", audioName[id]);
        this.setState({ chosenAudio: audioName[id], meditationSelected: true });
    };
    componentDidUpdate() {
        this.refs.audio.load();
    }
    render() {
        return (
            <div>
                    <PresentAudio {...this.state} chooseAudio={this.chooseAudio} />
                {this.state.meditationSelected ? <audio controls ref="audio">
                    <source src={this.state.chosenAudio} type="audio/wav" />
                    not supported
                </audio> : ''}
            </div>
        )
    }
}
const PresentAudio = (props) => {
    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Meditation</h1>
                <hr className="hr" />
                <p>Relax your mind through meditation</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                </p>
            </div>
            {
                props.audio.map((audio, index) => (
                    <Button
                        key={index}
                        id={index}
                        chooseAudio={props.chooseAudio}
                        audioName={audio}
                    />
                ))
            }
        </div>
    )
};
// exports Meditation for external use
export default Meditation;