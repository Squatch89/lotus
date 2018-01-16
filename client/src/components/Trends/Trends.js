import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Chart} from 'react-google-charts';
import Wrapper from '../Wrapper/Wrapper.js';
import Container from '../Container/Container.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './Trends.css';

// creates Trends component to render to the page
class Trends extends Component {
    constructor() {
        super();
        this.state = {
            timeFrame: ["Week", "Month"]
        };
    }
    
    render() {
        return (
            <Wrapper>
                <Header/>
                <Container>
                    <div className="chart">
                        {/*<div className="jumbotron text-center">*/}
                        {/*<h1>Trends</h1>*/}
                        {/*<hr className="hr"/>*/}
                        {/*<p>Track your mental health</p>*/}
                        {/*<p className="lead">*/}
                        {/*<Link className="btn btn-primary btn-lg" to="/">Home</Link>*/}
                        {/*</p>*/}
                        {/*</div>*/}
                        
                        <Chart
                            chartType="PieChart"
                            data={[["Task", "Hours per Day"], ["Good", 4], ["Neutral", 2], ["Bad", 1]]}
                            options={{"title": "How My Week Has Gone", "backgroundColor": "transparent"}}
                            graph_id="PieChart"
                            width="100%"
                            height="400px"
                            legend_toggle
                            className="chartBg"
                        />
                    </div>
                </Container>
                <Footer/>
            </Wrapper>
        )
    }
}

// exports Trends for external use
export default Trends;