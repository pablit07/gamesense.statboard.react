import React, {Component} from 'react';
import '../App.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.min.css';
import * as d3 from 'd3';


class Chart extends Component {
    constructor(props) {

        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);


        this.state = {
            startDate: dateOneMonthAgo,
            endDate: now,
            width: this.getWidth(),
            height: 380
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({width: this.getWidth()});
    }

    getWidth() {
        return window.innerWidth - (window.innerWidth * 0.1);
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    addChartLayer(svg, rows, x, y, pt, color) {
        throw new Error("Must override addChartLayer")
    }

    render() {
        const rows = this.props.submissions;

        let xPad = Math.max(Math.log10(this.props.yMax) * 2.5, 0);
        let xPadAxis = 27 + xPad;

        let style = {
            background: "#E9ECEF",
            marginLeft: "4%",
            paddingLeft: xPad
        };

        if (this.ref) {
            let svg = d3.select(this.ref);
            svg.selectAll("g").remove();
        }

        let noDataMessage = rows && rows.length ? null : (
            <text className={"rt-noData"} y={(this.state.height / 2)} x={(this.state.width / 2)} dy={"1em"}
                  fill={"rgba(0,0,0,0.5)"} style={{"textAnchor": "middle"}}>{this.props.isLoading?"...Please Wait":"No Data To Display"}</text>);
        let rectOffset = this.state.height * 0.13;
        let result = (
            <div style={style}>

                {/* Legend or controls */}
                <div style={{textAlign: 'right'}}> {this.props.children} </div>

                {/* Chart */}
                <svg width={this.state.width + xPad}
                     height={this.state.height}>
                    <g transform={("translate(" + xPadAxis + "," + 30 + ")")} ref={r => {
                        this.ref = r
                    }}>
                        <rect x={0} y={0} height={this.state.height - rectOffset} width={this.state.width} style={{fill: "d9dbdd"}}/>
                        <text id={"yLabelBg"} transform={"rotate(-90)"} y={-xPadAxis} x={-(this.state.height / 2)}
                              dy={"1em"} fill={"E9ECEF"} style={{
                            "textAnchor": "middle",
                            "fontWeight": "bold",
                            stroke: "E9ECEF",
                            strokeWidth: "0.5em"
                        }}>
                            {this.props.yLabel}
                        </text>
                        <text transform={"rotate(-90)"} y={-xPadAxis} x={-(this.state.height / 2)} dy={"1em"}
                              fill={"black"} style={{"textAnchor": "middle", "fontWeight": "bold"}}>
                            {this.props.yLabel}
                        </text>
                        {noDataMessage}
                    </g>
                </svg>

            </div>);

        if (this.ref) {

            // console.warn(d3)
            let svg = d3.select(this.ref);

            // Add X axis

            let interval = (this.state.width - 20) / this.props.xValues.length;
            let numbers = Array.from({length: this.props.xValues.length}, (v, k) => k * interval);
            let xAxis = d3.scaleOrdinal()
                .domain(this.props.xValues)
                .range(numbers)

            svg.append("g")
                .attr("transform", "translate(0," + (this.state.height - 50) + ")")
                .call(this.xAxisFormat(xAxis));

            // Add Y axis
            let yAxis = d3.scaleLinear()
                .domain([this.props.yMax, 0])
                .range([0, (this.state.height - 50)]);

            svg.insert("g", "#yLabelBg")
                .call(this.yAxisFormat(yAxis));


            const make_x_gridlines = () => {
                return d3.axisBottom(xAxis)
                    .ticks(5)
            };

            // add the X gridlines
            this.drawXGridlines(svg, make_x_gridlines);

            this.props.values.forEach(v => this.addChartLayer(svg, rows, xAxis, yAxis, v.value, v.color));
        }

        return result;
    }

    drawXGridlines(svg, make_x_gridlines) {
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + 400 + ")")
            .call(make_x_gridlines()
                .tickSize(-400)
                .tickFormat("")
            );
    }

    yAxisFormat(yAxis) {
        return d3.axisLeft(yAxis);
    }

    xAxisFormat(xAxis) {
        return d3.axisBottom(xAxis);
    }
}

export default Chart;