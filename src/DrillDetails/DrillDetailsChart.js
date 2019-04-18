import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import * as d3 from 'd3';
import {Legend} from "./Legend";


class DrillDetailsChart extends Component {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);


        this.state = {
            submissions: [],
            isLoading: false,
            startDate: dateOneMonthAgo,
            endDate: now
        };

        this.dataSource = this.dataSource.bind(this);
    }


    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        this.setState({isLoading: true});

        let payload = {filters: {}, rollUpType: this.props.rollUpType || 'globalPitcherResponseType'};

        payload.authToken = this.props.socket.authToken;
        payload.filters.minDate = this.state.startDate;
        payload.filters.maxDate = this.state.endDate;

        // indiv or team
        // payload.filters.user_id = 150;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.drill.usageDetail',
            payload
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);

        let addChartLayer = (svg, rows, x, y, pt, color = "red") => {
            this.addChartLayer(rows, pt, svg, x, y, color);
        };

        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const responseData = typeof response.content === 'string' ? JSON.parse(response.content) : null;
            console.log('Here is the payload:\n', responseData);

            if (this.ref) {

                // console.warn(d3)
                let svg = this.createChart();

                // Add X axis
                let pitcherNames = responseData.rows.reduce((accum, next) => {
                    if (!accum.find(x => x === next.name)) {
                        accum.push(next.name);
                    }
                    return accum;
                }, []).sort();


                let interval = 1200 / pitcherNames.length;
                let numbers = Array.from({length: pitcherNames.length}, (v, k) => k*interval);
                var xAxis = d3.scaleOrdinal()
                    .domain(pitcherNames)
                    .range( numbers)
                // var xAxis = d3.scaleLinear()
                //     .domain([0, 100])
                //     .range([ 0, 100 ]);

                svg.append("g")
                    .attr("transform", "translate(0," + 350 + ")")
                    .call(d3.axisBottom(xAxis));


                // Add Y axis
                var yAxis = d3.scaleLinear()
                    .domain([100, 0])
                    .range([ 0, 350 ]);

                svg.append("g")
                    .call(d3.axisLeft(yAxis));


                let rows = responseData.rows;
                addChartLayer(svg, rows, xAxis, yAxis, 'pitchType_Fastball', "red");
                addChartLayer(svg, rows, xAxis, yAxis, 'pitchType_Slider', "green");
                addChartLayer(svg, rows, xAxis, yAxis, 'pitchType_Curveball', "orange");
                addChartLayer(svg, rows, xAxis, yAxis, 'pitchType_Cutter', "blue");
                addChartLayer(svg, rows, xAxis, yAxis, 'pitchType_Changeup', "purple");

            }

            this.setState({
                isLoading: false,
                submissions: responseData.rows
            });
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp, data);
    }

    createChart() {
        let svg = d3.select(this.ref)
            .append('svg')
            .attr("width", 1220)
            .attr("height", 400)
            .append("g")
            .attr("transform",
                "translate(" + 30 + "," + 30 + ")");
        svg
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 400)
            .attr("width", 1220)
            .style("fill", "EBEBEB")

        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - 35)
            .attr("x", 0 - (400 / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("% Correct");
        return svg;
    }

    addChartLayer(rows, pt, svg, x, y, color) {
        rows = rows.filter(x => !!x[pt] && x[pt] !== '-');
        svg.append('g')
            .selectAll('dot')
            .data(rows)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(d.name);
            })
            .attr("cy", function (d) {
                return y(d[pt]);
            })
            // .attr("cy", function (d) { return y(d.name); } )
            .attr("r", 5)
            .style("fill", color)
    }

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

    render() {
        let style = {
            paddingLeft: '50px'
        };

        return (
            <div style={style} id={'graph1'} ref={r => {this.ref = r}}>
                <div style={{textAlign:'right'}}> <Legend/> </div>
            </div>);
    }
}

export default DrillDetailsChart;