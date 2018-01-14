import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
    
    state = {
        meditationType: ["Breath", "Audio"],
        meditationSelected: false,
        audio: ["Day Time Forest", "Night Time Forest", "Ocean Waves", "White Noise", "Pink Noise"],
        audioFiles: [ForestOne, ForestTwo, OceanWaves, WhiteNoise, PinkNoise],
        chosenAudio: ""
    };
    
    chooseAudio = (id, fileName) => {
        console.log(fileName);
        
        const audioName = this.state.audioFiles;
        console.log(audioName[id]);
        
        switch (fileName) {
            case "Day Time Forest":
                console.log("You Selected day time forest");
                console.log(audioName[id]);
                this.setState({chosenAudio: audioName[id], meditationSelected: true});
                console.log(this.state.chosenAudio);
                break;
            case "Night Time Forest":
                console.log("You Selected night time forest");
                console.log(audioName[id]);
                this.setState({chosenAudio: audioName[id], meditationSelected: true});
                console.log(this.state.chosenAudio);
                break;
            case "Ocean Waves":
                console.log("You Selected ocean waves");
                console.log(audioName[id]);
                this.setState({chosenAudio: audioName[id], meditationSelected: true});
                console.log(this.state.chosenAudio);
                break;
            case "White Noise":
                console.log("You Selected white noise");
                console.log(audioName[id]);
                this.setState({chosenAudio: audioName[id], meditationSelected: true});
                console.log(this.state.chosenAudio);
                break;
            case "Pink Noise":
                console.log("You Selected pink noise");
                console.log(audioName[id]);
                this.setState({chosenAudio: audioName[id], meditationSelected: true});
                console.log(this.state.chosenAudio);
                break;
            default:
                console.log("oops! not set up yet");
        }
    };
    
    render() {
        if (!this.state.meditationSelected) {
            return (
                <div>
                    <div className="jumbotron text-center">
                        <h1>Meditation</h1>
                        <hr className="hr"/>
                        <p>Relax your mind through meditation</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                        </p>
                    </div>
                    {this.state.audio.map((audio, index) => (
                        <Button
                            key={index}
                            id={index}
                            chooseAudio={this.chooseAudio}
                            audioName={audio}
                        />
                    ))}
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="jumbotron text-center">
                        <h1>Meditation</h1>
                        <hr className="hr"/>
                        <p>Relax your mind through meditation</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                        </p>
                    </div>
                    {this.state.audio.map((audio, index) => (
                        <Button
                            key={index}
                            id={index}
                            chooseAudio={this.chooseAudio}
                            audioName={audio}
                        />
                    ))}
                    <Audio
                        src={this.state.chosenAudio}
                    />
                </div>
            )
        }
    }
}

// exports Meditation for external use
export default Meditation;


