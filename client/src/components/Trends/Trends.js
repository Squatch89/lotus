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
        const currentDate = new Date();
        const currentDateMoment = moment(currentDate);
        super();
        this.state = {
            good: [],
            neutral: [],
            bad: [],
            //user should select which time frame they would like to see
            timeFrame: ["Week", "Month"],
            //set currentWeek to current week number using moment
            currentWeek: currentDateMoment.week(),
            //set currentMonth to current month number using moment
            currentMonth: currentDateMoment.month() + 1,
            prevWeek: currentDateMoment.week(),
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
                    if (ele.mood === "good" && moment(ele.date).week() === this.state.currentWeek) {
                        this.setState({good: [...this.state.good, ele.mood]})
                    }
                    else if (ele.mood === "neutral" && moment(ele.date).week() === this.state.currentWeek) {
                        this.setState({neutral: [...this.state.neutral, ele.mood]})
                    }
                    else if (ele.mood === "bad" && moment(ele.date).week() === this.state.currentWeek) {
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
        
        
        //add if statement where if the current week matches the week in the data from the db, then display that info.
        //week state will always be the current week number
        //shadow variable will change based on how many times user clicks on previous week button
        //each time user clicks on previous week button the shadow variable will decrement 1
        //mimic this functionality to then return to current week
        
        //implement week functionality into month function using same principles
    
        console.log(this.state.prevWeek);
        if (this.state.prevWeek >= 0) {
            this.setState({prevWeek: this.state.prevWeek - 1});
        }
        console.log(this.state.prevWeek);
        axios.get(`/api/mood/trends/prevweek/${this.state.username}`)
            .then((data) => {
                console.log(data.data);
                data.data.forEach((ele, index) => {
                    
                    console.log(`${moment(ele.date).year()}-${moment(ele.date).month() + 1}-${moment(ele.date).date()}`);
    
                    if (ele.mood === "good" && moment(ele.date).week() === this.state.prevWeek) {
                        this.setState({good: [...this.state.good, ele.mood]})
                    }
                    else if (ele.mood === "neutral" && moment(ele.date).week() === this.state.prevWeek) {
                        this.setState({neutral: [...this.state.neutral, ele.mood]})
                    }
                    else if (ele.mood === "bad" && moment(ele.date).week() === this.state.prevWeek) {
                        this.setState({bad: [...this.state.bad, ele.mood]})
                    }
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