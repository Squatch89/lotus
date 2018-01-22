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
            timeFrame: "week",
            //set currentWeek to current week number using moment
            currentWeek: currentDateMoment.week(),
            //set currentMonth to current month number using moment
            currentMonth: currentDateMoment.month() + 1,
            prevWeek: currentDateMoment.week(),
            prevMonth: currentDateMoment.month(),
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
            })
            .catch((err) => {
                console.log("There was an error.");
                console.log(err);
            })
        
        // this.setState({trends:})
    };
    
    whichWeek = (e) => {
        //date format is in YYYY - MM - DD
        console.log(this.state.timeFrame);
        
        //implement week functionality into month function using same principles
        if (this.state.timeFrame === "week") {
            if (e.target.id === "back"){
                if (this.state.prevWeek > 0) {
                    this.setState({prevWeek: this.state.prevWeek - 1});
                }
        
            }
            else if (e.target.id === "forward") {
                if (this.state.prevWeek < this.state.currentWeek) {
                    this.setState({prevWeek: this.state.prevWeek + 1});
                }
            }
        }
        else if (this.state.timeFrame === "month") {
            if (e.target.id === "back"){
                if (this.state.prevMonth > 0) {
                    this.setState({prevMonth: this.state.prevMonth - 1});
                }
        
            }
            else if (e.target.id === "forward") {
                if (this.state.prevMonth < this.state.currentMonth) {
                    this.setState({prevMonth: this.state.prevMonth + 1});
                }
            }
        }
        
        this.setState({good: 0, neutral: 0, bad: 0});
        
        console.log(this.state.prevWeek);
        axios.get(`/api/mood/trends/prevweek/${this.state.username}`)
            .then((data) => {
                console.log(data.data);
                data.data.forEach((ele, index) => {
                    
                    console.log(`${moment(ele.date).year()}-${moment(ele.date).month() + 1}-${moment(ele.date).date()}`);
                    
                    
                    //changes data displayed in graph by week
                    if (this.state.timeFrame === "week") {
                        if (ele.mood === "good" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({good: [...this.state.good, ele.mood]})
                        }
                        else if (ele.mood === "neutral" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({neutral: [...this.state.neutral, ele.mood]})
                        }
                        else if (ele.mood === "bad" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({bad: [...this.state.bad, ele.mood]})
                        }
                    }
                    //changes data displayed in graph by month
                    else if (this.state.timeFrame === "month") {
                        if (ele.mood === "good" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({good: [...this.state.good, ele.mood]})
                        }
                        else if (ele.mood === "neutral" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({neutral: [...this.state.neutral, ele.mood]})
                        }
                        else if (ele.mood === "bad" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({bad: [...this.state.bad, ele.mood]})
                        }
                    }
                })
            })
    };
    
    weekOrMonth = (e) => {
        const whichTrend = e.target.id;
        console.log(whichTrend);
        
        if (whichTrend === "week") {
            this.setState({timeFrame: "week"})
        }
        else if (whichTrend === "month") {
            this.setState({timeFrame: "month"})
        }
    
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
                        <button id="back" onClick={this.whichWeek}>Go Back a Week/Month</button>
                        <button id="week" onClick={this.weekOrMonth}>Weekly Trends</button>
                        <button id="month" onClick={this.weekOrMonth}>Monthly Trends</button>
                        <button id="forward" onClick={this.whichWeek}>Go Forward a Week/Month</button>
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