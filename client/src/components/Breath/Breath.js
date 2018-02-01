import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';


class Breath extends Component {
    
    constructor() {
        super();
        this.state = {
            breathStart: false
        };
    }
    
    startBreath = (id) => {
        if (id === "start") {
            this.setState({breathStart: true});
        }
    };
    
    render() {
        return (
            <Wrapper>
                <Header/>
                <Container>
                    <div className="jumbotron">
                        <h1>Guided Breathing</h1>
                        <hr className="hr"/>
                        <div className="circleContainer">
                            {(!this.state.breathStart) ?
                                <div className="circleText">Breathe fully into your stomach
                                    as
                                    the circle
                                    expands, and fully release as
                                    the circle contracts
                                    <div>
                                        <button onClick={() => {this.startBreath("start")}} id="start"
                                                className="btn btn-primary btn-button">Start
                                        </button>
                                    </div>
                                </div>
                                :
                                < div className="circle"></div>
                            }
                        </div>
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}

export default Breath;
