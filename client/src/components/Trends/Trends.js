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
            currentYear: currentDateMoment.year(),
            prevWeek: currentDateMoment.week(),
            prevMonth: currentDateMoment.month(),
            startOfWeek: "",
            endOfWeek: "",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            username: JSON.parse(sessionStorage.getItem('UN')),
            pulled: false,
        };
    }
    
    getFromDB = () => {
        
        console.log(this.state.username);
        
        axios.get(`/api/mood/trends/${this.state.username}`)
            .then((data) => {
                console.log(data.data);
                data.data.forEach((ele, index) => {
                    
                    this.setDate(ele.date);
                    
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
            if (e.target.id === "back") {
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
            if (e.target.id === "back") {
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
        
        console.log(this.state.prevWeek);
        this.getTrendsData();
    };
    
    getTrendsData = () => {
        axios.get(`/api/mood/trends/prevweek/${this.state.username}`)
            .then((data) => {
                console.log(data.data);
                this.setState({good: 0, neutral: 0, bad: 0});
                data.data.forEach((ele, index) => {
                    
                    console.log(`${moment(ele.date).year()}-${moment(ele.date).month() + 1}-${moment(ele.date).date()}`);
                    
                    //changes data displayed in graph by week
                    if (this.state.timeFrame === "week") {
                        if (ele.mood === "good" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({good: [...this.state.good, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "neutral" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({neutral: [...this.state.neutral, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "bad" && moment(ele.date).week() === this.state.prevWeek) {
                            this.setState({bad: [...this.state.bad, ele.mood]});
                            this.setDate(ele.date);
                        }
                    }
                    //changes data displayed in graph by month
                    else if (this.state.timeFrame === "month") {
                        if (ele.mood === "good" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({good: [...this.state.good, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "neutral" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({neutral: [...this.state.neutral, ele.mood]});
                            this.setDate(ele.date);
                        }
                        else if (ele.mood === "bad" && moment(ele.date).month() === this.state.prevMonth) {
                            this.setState({bad: [...this.state.bad, ele.mood]});
                            this.setDate(ele.date);
                        }
                    }
                })
            })
    };
    
    weekOrMonth = (e) => {
        const whichTrend = e.target.id;
        console.log(whichTrend);
        
        if (whichTrend === "week") {
            this.setState({timeFrame: "week"});
            this.getTrendsData();
        }
        else if (whichTrend === "month") {
            this.setState({timeFrame: "month"});
            this.getTrendsData();
        }
        
    };
    
    setDate = (date) => {
        
        console.log(`This is ${date}`);
        const startOfWeek = moment(date).startOf("week")._d;
        const endOfWeek = moment(date).endOf("week")._d;
    
        this.setState({startOfWeek: `${moment(startOfWeek).year()}-${moment(startOfWeek).month() + 1}-${moment(startOfWeek).date()}`, endOfWeek: `${moment(endOfWeek).year()}-${moment(endOfWeek).month() + 1}-${moment(endOfWeek).date()}` });
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
                    
                    <div className=" btn-container text-center">
                    {/*<button className="btn btn-primary" id="back" onClick={this.whichWeek}>Go Back*/}
                        {/*a {(this.state.timeFrame === "week") ? "Week" : "Month"}</button>*/}
                        <i className="fa fa-arrow-left arrow" id="back" onClick={this.whichWeek}/>
                        <span id="center-btn">
                    <button className="btn btn-primary" id="week" onClick={this.weekOrMonth}>Weekly Trends</button>
                    <button className="btn btn-primary" id="month" onClick={this.weekOrMonth}>Monthly Trends</button>
                        </span>
                    {/*<button className="btn btn-primary" id="forward" onClick={this.whichWeek}>Go Forward*/}
                        {/*a {(this.state.timeFrame === "week") ? "Week" : "Month"}</button>*/}
                        <i className="fa fa-arrow-right arrow" id="forward" onClick={this.whichWeek}/>
                    </div>
                    
                    {/*displays the current date for the data that was pulled*/}
                    {(this.state.timeFrame === "week")?
                        <div className="text-center">Trends for the week of {moment(this.state.startOfWeek).format("D, MMMM, YYYY")} to {moment(this.state.endOfWeek).format("D, MMMM, YYYY")}</div>
                    :
                        <div className="text-center">Trends for {this.state.months[this.state.prevMonth]} {this.state.currentYear} </div>
                    }
                    
                    {/*{console.log(`What is the state of Good? ${this.state.good}`)}*/}
                    <div className="chart">
                        {(this.state.good === 0 && this.state.bad === 0 && this.state.neutral    === 0) ?
                            <div className="text-center">
                                <p>Sorry There is no data to display</p>
                            </div> :
                        <Chart
                            chartType="PieChart"
                            data={[["User Trends", "Type of Days Had"], ["Good", this.state.good.length], ["Neutral", this.state.neutral.length], ["Bad", this.state.bad.length]]}
                            options={{
                                "backgroundColor": "transparent",
                                "colors": ['#14B2CC', '#3D8C99', '#063840'],
                                "legend": {"position": "bottom"}
                            }}
                            graph_id="PieChart"
                            width="100%"
                            height="100%"
                            legend_toggle
                            className="chartBg"
                        />}
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}

// exports Trends for external use
export default Trends;


