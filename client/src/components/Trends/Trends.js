import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Trends.css';
import axios from 'axios';
import moment from "moment";

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
                    // console.log(ele.mood);
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
    
    previousWeek = () => {
        //date format is in YYYY - MM - DD
        
        const currentDate = new Date();
        const currentDateMoment = moment(currentDate);
        
        console.log(currentDateMoment.week());
        console.log(currentDateMoment.date());
        console.log(currentDateMoment.weekday());
        console.log(currentDateMoment.month());
        console.log(currentDateMoment.year());
        console.log(`${currentDateMoment.year()}-${currentDateMoment.month()}-${currentDateMoment.date()}`);
        
        // console.log(currentDate.getDay());
        // console.log(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
        
        axios.get(`/api/mood/trends/prevweek/${this.state.username}`)
            .then((data) => {
                console.log(data.data);
                data.data.forEach((ele, index) => {
                    let dbDate = new Date(ele.date);
                    let dbDateMoment = moment(dbDate);
                    console.log(dbDateMoment.week());
                    console.log(dbDateMoment.date());
                    // console.log(dbDateMoment.weekday());
                    // console.log(dbDateMoment.month());
                    // console.log(dbDateMoment.year());
                    console.log(`${dbDateMoment.year()}-${dbDateMoment.month()}-${dbDateMoment.date()}`);
                    // console.log(date.week());
                    // console.log(date.getDay());
                    // console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
                })
            })
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
                        <button onClick={this.previousWeek}>prev week</button>
                        {/*<button onClick={this.getFromDB}> Get Trends </button>*/}
                        {this.state.pulled ?
                            <Chart
                                chartType="PieChart"
                                data={[["User Trends", "Type of Days Had"], ["Good", this.state.good.length], ["Bad", this.state.bad.length], ["Neutral", this.state.neutral.length]]}
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