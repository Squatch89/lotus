import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Chart} from 'react-google-charts';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Trends.css';
import axios from 'axios';

// creates Trends component to render to the page
class Trends extends Component {
    constructor() {
        super();
        this.state = {
            good: [],
            neutral: [],
            bad: [],
            timeFrame: ["Week", "Month"],
            username: JSON.parse(sessionStorage.getItem('UN')),
            pulled: false
        };
    }
    
    getFromDB = () => {
        
        console.log(this.state.username);
        
        axios.get(`/api/mood/trends/${this.state.username}`)
            .then((data) => {
                console.log(data.data);
                data.data.forEach((ele, index) => {
                    console.log(ele.mood);
                    if (ele.mood === "good") {
                        this.setState({good: [...this.state.good, ele.mood]})
                    }
                    else if (ele.mood === "neutral") {
                        this.setState({neutral: [...this.state.neutral, ele.mood]})
                    }
                    else if (ele.mood === "bad") {
                        this.setState({bad: [...this.state.bad, ele.mood]})
                    }
                });
                console.log("this is good");
                console.log(this.state.good);
                console.log("this is neutral");
                console.log(this.state.neutral);
                console.log("this is bad");
                console.log(this.state.bad);
            })
            .catch((err) => {
                console.log("There was an error.");
                console.log(err);
            })
        
        // this.setState({trends:})
    };
    
    componentWillMount() {
        this.getFromDB();
    }
    
    componentDidMount() {
        this.setState({pulled: true});
    }
    
    render() {
        return (
            <Wrapper>
                <Header/>
                <Container>
                    <div className="chart">
                        {/*<button onClick={this.getFromDB}> Get Trends </button>*/}
                        { this.state.pulled ?
                        <Chart
                            chartType="PieChart"
                            data={[["User Trends", "Type of Days Had"], ["Good", this.state.good.length], ["Neutral", this.state.neutral.length], ["Bad", this.state.bad.length]]}
                            options={{"title": "How My Week Has Gone", "backgroundColor": "transparent"}}
                            graph_id="PieChart"
                            width="100%"
                            height="400px"
                            legend_toggle
                            className="chartBg"
                        /> : null}
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}

// exports Trends for external use
export default Trends;