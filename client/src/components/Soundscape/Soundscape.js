import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import ForestOne from './Audio/Forest-1.mp3';
import ForestTwo from './Audio/Forest-2.mp3';
import OceanWaves from './Audio/Ocean-1.mp3';


class Soundscape extends Component {

    // stores audio data
    constructor() {
        super();
        this.state = {
            audio: ["Day Time Forest", "Night Time Forest", "Ocean Waves"],
            audioFiles: [ForestOne, ForestTwo, OceanWaves],
            chosenAudio: '',
        };
    }

    // sets audio based on selection
    chooseAudio = (id, filename) => {
        const audioName = this.state.audioFiles;
        this.setState({chosenAudio: audioName[id]});
    };

    // loads audio data (media player)
    componentDidUpdate() {
            this.refs.audio.load();
    }
    
    render() {
        return (
        
            <Wrapper>
                <Header/>
                <Container>
                    <div className="jumbotron text-center">
                        <h1>Soundscapes</h1>
                        <hr className="hr"/>
                        <p>Choose a relaxing soundscape.</p>
                        <div className="btn-space">
                        
                            <button onClick={() => {this.chooseAudio(0)}} className="btn btn-primary btn-lg btn-button audio">Day Time Forest</button>
                            <button onClick={() => {this.chooseAudio(1)}} className="btn btn-primary btn-lg btn-button audio">Night Time Forest</button>
                            <button onClick={() => {this.chooseAudio(2)}} className="btn btn-primary btn-lg btn-button audio">Ocean Waves</button>
    
                            <audio controls ref="audio" autoPlay loop>
        
                                <source src={this.state.chosenAudio} type="audio/wav" />
        
                                not supported
    
                            </audio>
                            
                        </div>
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
};

export default Soundscape